/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DisclaimerFooter } from './components/DisclaimerFooter';
import { DemoWalkthroughModal } from './components/DemoWalkthroughModal';
import { AiCopilotModal } from './components/AiCopilotModal';

// Views
import { CommandCenterView } from './components/views/CommandCenterView';
import { NetworkMapView } from './components/views/NetworkMapView';
import { DataIntegrationView } from './components/views/DataIntegrationView';
import { MaintenanceView } from './components/views/MaintenanceView';
import { AssetRiskView } from './components/views/AssetRiskView';
import { AiCriticalityView } from './components/views/AiCriticalityView';
import { OpportunitiesView } from './components/views/OpportunitiesView';
import { TrainImpactView } from './components/views/TrainImpactView';
import { ConflictRadarView } from './components/views/ConflictRadarView';
import { ResourceIntelligenceView } from './components/views/ResourceIntelligenceView';
import { BlockOptimizationView } from './components/views/BlockOptimizationView';
import { WeeklyPlanView } from './components/views/WeeklyPlanView';
import { MonthlyPlanView } from './components/views/MonthlyPlanView';
import { DigitalTwinView } from './components/views/DigitalTwinView';
import { EmergencyModeView } from './components/views/EmergencyModeView';
import { ExplainabilityView } from './components/views/ExplainabilityView';
import { BenchmarkView } from './components/views/BenchmarkView';
import { SystemArchitectureView } from './components/views/SystemArchitectureView';

// Domain Data
import { STATIONS, SECTIONS } from './data/corridorData';
import { ASSETS } from './data/assetData';
import { MAINTENANCE_TASKS } from './data/taskData';
import { TRAIN_MOVEMENTS, FREIGHT_FORECASTS } from './data/trainData';
import { BLOCK_WINDOWS } from './data/blockData';
import { RESOURCES } from './data/resourceData';

// Engines & Services
import { runBlockOptimization, OptimizationRunResult } from './services/optimizationEngine';
import { discoverMaintenanceOpportunities } from './services/opportunityEngine';
import {
  simulateWhatIfFreightPlus20,
  triggerEmergencySignalFailurePlan,
  WhatIfScenarioResult,
  EmergencyPlanResult,
} from './services/digitalTwinService';
import { MaintenanceTask, OptimizationParameters } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<string>('command-center');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('SEC018');
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);

  // Modals
  const [isDemoOpen, setIsDemoOpen] = useState<boolean>(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);

  // Optimization & Scenario State
  const [currentTasks, setCurrentTasks] = useState<MaintenanceTask[]>(MAINTENANCE_TASKS);
  const [currentBlocks, setCurrentBlocks] = useState(BLOCK_WINDOWS);

  // Initial optimization run
  const [optimizationResult, setOptimizationResult] = useState<OptimizationRunResult>(() =>
    runBlockOptimization(MAINTENANCE_TASKS, BLOCK_WINDOWS, RESOURCES)
  );

  // What-If & Emergency State
  const [whatIfResult, setWhatIfResult] = useState<WhatIfScenarioResult | null>(null);
  const [isEmergencyActive, setIsEmergencyActive] = useState<boolean>(false);
  const [emergencyPlan, setEmergencyPlan] = useState<EmergencyPlanResult | null>(null);

  // Compute discovered bundles
  const bundles = useMemo(() => {
    return discoverMaintenanceOpportunities(currentTasks, currentBlocks).bundles;
  }, [currentTasks, currentBlocks]);

  // Handler: Run CP-SAT Optimization
  const handleRunOptimization = (params?: OptimizationParameters) => {
    const result = runBlockOptimization(currentTasks, currentBlocks, RESOURCES, params);
    setOptimizationResult(result);
    // Update tasks and blocks with scheduled assignments
    setCurrentTasks(result.scheduledTasks);
    setCurrentBlocks(result.updatedBlocks);
  };

  // Handler: Trigger What-If Freight +20%
  const handleTriggerWhatIf = () => {
    const res = simulateWhatIfFreightPlus20(
      currentTasks,
      currentBlocks,
      TRAIN_MOVEMENTS,
      FREIGHT_FORECASTS,
      RESOURCES
    );
    setWhatIfResult(res);
    setOptimizationResult(res.reoptimizedResult);
    setActiveView('digital-twin');
  };

  // Handler: Toggle Emergency Signal Failure Mode
  const handleToggleEmergency = () => {
    if (isEmergencyActive) {
      // Stand down emergency
      setIsEmergencyActive(false);
      setEmergencyPlan(null);
      handleRunOptimization();
    } else {
      // Activate emergency on SEC012
      setIsEmergencyActive(true);
      const res = triggerEmergencySignalFailurePlan(currentTasks, currentBlocks, RESOURCES);
      setEmergencyPlan(res);
      setOptimizationResult(res.reoptimizedResult);
      setActiveView('emergency-mode');
    }
  };

  // Corridor Summary for AI Copilot Context
  const corridorSummary = useMemo(() => {
    return {
      corridor: 'Chennai Central to Chittoor (MAS -> CTO)',
      stationsCount: STATIONS.length,
      sectionsCount: SECTIONS.length,
      assetsCount: ASSETS.length,
      tasksCount: currentTasks.length,
      blocksCount: currentBlocks.length,
      bundlesDiscovered: bundles.length,
      scheduledTasksCount: optimizationResult.scheduledTasks.filter(t => t.status === 'SCHEDULED' || t.status === 'BUNDLED').length,
      unscheduledTasksCount: optimizationResult.unscheduledTasks.length,
      blockUtilization: optimizationResult.railoptxMetrics.blockUtilizationPercent,
      assetAvailability: optimizationResult.railoptxMetrics.overallAssetAvailabilityPercent,
      emergencyActive: isEmergencyActive,
    };
  }, [currentTasks, currentBlocks, bundles, optimizationResult, isEmergencyActive]);

  return (
    <div id="railoptx-application-root" className="flex min-h-screen flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Main Navigation Header */}
      <Header
        onOpenDemo={() => setIsDemoOpen(true)}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        isEmergencyActive={isEmergencyActive}
        onToggleEmergency={handleToggleEmergency}
        onSelectView={setActiveView}
        activeView={activeView}
      />

      {/* Main Workspace Layout (Sidebar + Scrollable View Container) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Operational Sidebar */}
        <Sidebar
          activeView={activeView}
          onSelectView={setActiveView}
          opportunitiesCount={bundles.length}
          conflictsCount={3}
          isEmergencyActive={isEmergencyActive}
        />

        {/* View Canvas */}
        <main
          id="railoptx-main-canvas"
          className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-slate-800"
        >
          <div className="mx-auto max-w-7xl">
            {activeView === 'command-center' && (
              <CommandCenterView
                sections={SECTIONS}
                tasks={currentTasks}
                blocks={currentBlocks}
                bundles={bundles}
                metrics={optimizationResult.railoptxMetrics}
                onSelectView={setActiveView}
                onSelectSection={secId => {
                  setSelectedSectionId(secId);
                  setActiveView('network');
                }}
                onSelectTask={task => {
                  setSelectedTask(task);
                  setActiveView('maintenance');
                }}
                onRunOptimization={handleRunOptimization}
                onTriggerDemo={() => setIsDemoOpen(true)}
                onTriggerWhatIf={handleTriggerWhatIf}
                onTriggerEmergency={handleToggleEmergency}
              />
            )}

            {activeView === 'network' && (
              <NetworkMapView
                stations={STATIONS}
                sections={SECTIONS}
                assets={ASSETS}
                tasks={currentTasks}
                blocks={currentBlocks}
                freightForecasts={FREIGHT_FORECASTS}
                selectedSectionId={selectedSectionId}
                onSelectSection={setSelectedSectionId}
                onSelectTask={task => {
                  setSelectedTask(task);
                  setActiveView('maintenance');
                }}
              />
            )}

            {activeView === 'data-integration' && (
              <DataIntegrationView
                onRunOptimization={handleRunOptimization}
                onSelectView={setActiveView}
              />
            )}

            {activeView === 'maintenance' && (
              <MaintenanceView
                tasks={currentTasks}
                onSelectTask={setSelectedTask}
                selectedTask={selectedTask}
                onCloseTaskDetail={() => setSelectedTask(null)}
              />
            )}

            {activeView === 'asset-risk' && (
              <AssetRiskView
                assets={ASSETS}
                onSelectSection={secId => {
                  setSelectedSectionId(secId);
                  setActiveView('network');
                }}
              />
            )}

            {activeView === 'ai-criticality' && (
              <AiCriticalityView
                tasks={currentTasks}
                assets={ASSETS}
                sections={SECTIONS}
                onSelectTask={setSelectedTask}
              />
            )}

            {activeView === 'opportunities' && (
              <OpportunitiesView
                bundles={bundles}
                tasks={currentTasks}
                blocks={currentBlocks}
                onSelectTask={setSelectedTask}
                onSelectView={setActiveView}
              />
            )}

            {activeView === 'train-impact' && (
              <TrainImpactView
                trains={TRAIN_MOVEMENTS}
                blocks={currentBlocks}
                freightForecasts={FREIGHT_FORECASTS}
                onSelectView={setActiveView}
              />
            )}

            {activeView === 'conflict-radar' && (
              <ConflictRadarView
                violations={[]}
                onRunOptimization={handleRunOptimization}
                onSelectView={setActiveView}
              />
            )}

            {activeView === 'resource-intelligence' && (
              <ResourceIntelligenceView
                resources={RESOURCES}
                onSelectView={setActiveView}
              />
            )}

            {activeView === 'block-optimization' && (
              <BlockOptimizationView
                optimizationResult={optimizationResult}
                onRunOptimization={handleRunOptimization}
                onSelectView={setActiveView}
              />
            )}

            {activeView === 'weekly-plan' && (
              <WeeklyPlanView
                blocks={currentBlocks}
                tasks={currentTasks}
                sections={SECTIONS}
                onSelectTask={setSelectedTask}
              />
            )}

            {activeView === 'monthly-plan' && (
              <MonthlyPlanView onSelectView={setActiveView} />
            )}

            {activeView === 'digital-twin' && (
              <DigitalTwinView
                whatIfResult={whatIfResult}
                onTriggerWhatIf={handleTriggerWhatIf}
                onSelectView={setActiveView}
              />
            )}

            {activeView === 'emergency-mode' && (
              <EmergencyModeView
                isEmergencyActive={isEmergencyActive}
                emergencyPlan={emergencyPlan}
                onToggleEmergency={handleToggleEmergency}
                onSelectView={setActiveView}
              />
            )}

            {activeView === 'explainability' && (
              <ExplainabilityView onSelectView={setActiveView} />
            )}

            {activeView === 'benchmark' && (
              <BenchmarkView
                metrics={optimizationResult.railoptxMetrics}
                onSelectView={setActiveView}
              />
            )}

            {activeView === 'system-architecture' && (
              <SystemArchitectureView />
            )}
          </div>
        </main>
      </div>

      {/* Persistent Bottom Disclaimer Footer */}
      <DisclaimerFooter />

      {/* 11-Step Interactive Walkthrough Modal for Smart India Hackathon 2026 */}
      <DemoWalkthroughModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onSelectView={viewId => {
          setActiveView(viewId);
        }}
        onTriggerWhatIf={handleTriggerWhatIf}
        onTriggerEmergency={handleToggleEmergency}
      />

      {/* Decision Support AI Copilot Assistant Drawer */}
      <AiCopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        corridorSummary={corridorSummary}
      />
    </div>
  );
}
