// Performance optimization utilities

/**
 * Debounce function to limit function calls
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function to limit function calls
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Preload images for better performance
 */
export const preloadImages = (urls: string[]) => {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

/**
 * Check if browser supports WebP
 */
export const supportsWebP = (): boolean => {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL("image/webp").indexOf("image/webp") === 5;
};

/**
 * Get optimal image format based on browser support
 */
export const getOptimalImageFormat = (
  webpUrl: string,
  fallbackUrl: string
): string => {
  return supportsWebP() ? webpUrl : fallbackUrl;
};

/**
 * Measure Core Web Vitals
 */
export const measureWebVitals = () => {
  if ("web-vital" in window) {
    // Use web-vitals library if available
    return;
  }

  // Fallback: Basic measurement
  if ("PerformanceObserver" in window) {
    try {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        console.log("LCP:", lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            console.log("CLS:", clsValue);
          }
        }
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (e) {
      console.warn("Web Vitals measurement not supported");
    }
  }
};

