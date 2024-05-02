import { random } from 'lodash';
import {
  ChartData,
  ChartMetaInfo,
  ChartTemplate,
  ChartTemplateContent,
  IExternalSaveLoadAdapter,
  LineToolsAndGroupsLoadRequestContext,
  LineToolsAndGroupsLoadRequestType,
  LineToolsAndGroupsState,
  StudyTemplateData,
  StudyTemplateMetaInfo,
} from 'public/charting_library';

// ChartData & ChartMetaInfo have conflicting ID types
type SavedChartData = ChartData & Omit<ChartMetaInfo, 'id'>;

// Localstorage key for saving chart state
const LOCALSTORAGE_KEY = 'vertex.tvSavedCharts';

/**
 * Creates a unique ID for a saved chart
 */
function createId() {
  return (Date.now() * 100 + random(100)).toFixed();
}

/**
 * Adapter for saving/loading charts to localstorage.
 * Documentation: https://www.tradingview.com/charting-library-docs/latest/saving_loading/
 */
export class SaveLoadAdapter implements IExternalSaveLoadAdapter {
  private chartsById: Map<string, SavedChartData> = new Map();

  async getAllCharts(): Promise<ChartMetaInfo[]> {
    this.loadSavedChartsFromStorage();

    return Array.from(this.chartsById.values()).map((item) => {
      return {
        ...item,
        // Chart IDs are strings, but `ChartMetaInfo` expects numbers for whatever reason. This doesn't seem
        // to impact behavior
        id: item.id as unknown as number,
      };
    });
  }

  async removeChart(id: string | number) {
    this.chartsById.delete(id.toString());
    this.saveChartsToStorage();
  }

  async saveChart(chartData: ChartData): Promise<string> {
    let chartId: string;
    // If chart doesn't have an ID, then create an ID
    if (!chartData.id) {
      chartId = createId();
      chartData.id = chartId;
    } else {
      chartId = chartData.id;
    }
    this.chartsById.set(chartId, {
      ...chartData,
      id: chartId,
      timestamp: Date.now(),
    });
    this.saveChartsToStorage();

    return chartId;
  }

  async getChartContent(id: string | number): Promise<string> {
    const chart = this.chartsById.get(id.toString());

    if (chart) {
      return chart.content;
    }

    return Promise.reject(`Chart with ID ${id} not found`);
  }

  /*
  The rest of these won't be needed
   */

  getAllChartTemplates(): Promise<string[]> {
    return Promise.resolve([]);
  }

  getAllStudyTemplates(): Promise<StudyTemplateMetaInfo[]> {
    return Promise.resolve([]);
  }

  getChartTemplateContent(templateName: string): Promise<ChartTemplate> {
    return Promise.resolve({ content: undefined });
  }

  getDrawingTemplates(toolName: string): Promise<string[]> {
    return Promise.resolve([]);
  }

  getStudyTemplateContent(
    studyTemplateInfo: StudyTemplateMetaInfo,
  ): Promise<string> {
    return Promise.resolve('');
  }

  saveLineToolsAndGroups(
    layoutId: string | undefined,
    chartId: string,
    state: LineToolsAndGroupsState,
  ): Promise<void> {
    return Promise.resolve(undefined);
  }

  loadLineToolsAndGroups(
    layoutId: string | undefined,
    chartId: string,
    requestType: LineToolsAndGroupsLoadRequestType,
    requestContext: LineToolsAndGroupsLoadRequestContext,
  ): Promise<Partial<LineToolsAndGroupsState> | null> {
    return Promise.resolve(null);
  }

  loadDrawingTemplate(toolName: string, templateName: string): Promise<string> {
    return Promise.resolve('');
  }

  removeChartTemplate(templateName: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  removeDrawingTemplate(toolName: string, templateName: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  removeStudyTemplate(studyTemplateInfo: StudyTemplateMetaInfo): Promise<void> {
    return Promise.resolve(undefined);
  }

  saveChartTemplate(
    newName: string,
    theme: ChartTemplateContent,
  ): Promise<void> {
    return Promise.resolve(undefined);
  }

  saveDrawingTemplate(
    toolName: string,
    templateName: string,
    content: string,
  ): Promise<void> {
    return Promise.resolve(undefined);
  }

  saveStudyTemplate(studyTemplateData: StudyTemplateData): Promise<void> {
    return Promise.resolve(undefined);
  }

  private loadSavedChartsFromStorage() {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const savedChartsJson = localStorage.getItem(LOCALSTORAGE_KEY);
      const savedChartsObj = JSON.parse(savedChartsJson ?? '{}');
      this.chartsById = new Map(Object.entries(savedChartsObj));
    } catch (err) {
      console.warn(
        '[SaveLoadAdapter] Failed to load saved charts from localstorage',
        err,
      );
    }
  }

  private saveChartsToStorage() {
    if (typeof window === 'undefined') {
      return;
    }

    // TV discourages using localstorage because of size requirements
    // To prevent excessive storage, we only save up to 5 charts
    const entriesToSave = Array.from(this.chartsById.entries()).slice(0, 5);
    const jsonChartsData = JSON.stringify(Object.fromEntries(entriesToSave));

    try {
      localStorage.setItem(LOCALSTORAGE_KEY, jsonChartsData);
    } catch (err) {
      console.warn(
        '[SaveLoadAdapter] Failed to save charts to localstorage',
        err,
      );
    }
  }
}
