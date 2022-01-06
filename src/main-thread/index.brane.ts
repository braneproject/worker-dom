/**
 * @fileoverview This entry point API in active development and unstable.
 */

import { fetchAndInstall, install } from './install';
import { WorkerDOMConfiguration, LongTaskFunction } from './configuration';
import { ExportedWorker } from './exported-worker';

const hydrateFilter = (element: RenderableElement) => {
  return true;
};

export function upgradeElement(
  baseElement: Element,
  domURL: string,
  longTask?: LongTaskFunction,
  sanitizer?: Sanitizer,
  sandbox?: { iframeUrl: string },
): Promise<ExportedWorker | null> {
  const authorURL = baseElement.getAttribute('src');
  if (authorURL) {
    return fetchAndInstall(baseElement as HTMLElement, {
      domURL,
      authorURL,
      longTask,
      hydrateFilter,
      sanitizer,
      sandbox,
    });
  }
  return Promise.resolve(null);
}

export function upgrade(
  baseElement: Element,
  fetchPromise: Promise<[string, string]>,
  config: WorkerDOMConfiguration,
): Promise<ExportedWorker | null> {
  config.hydrateFilter = hydrateFilter;
  return install(fetchPromise, baseElement as HTMLElement, config);
}
