// Layout constants for consistent positioning across the app
export const DOCK_POSITIONING = {
  // Mobile: bottom center, Desktop: right anchored - simplified to bottom only
  STANDARD: "fixed bottom-4 left-1/2 transform -translate-x-1/2 lg:transform lg:translate-x-0 z-[80]",
  
  // Calendar page specific positioning - simplified to bottom only
  CALENDAR: "fixed bottom-4 left-1/2 transform -translate-x-1/2 lg:transform lg:translate-x-0 z-[80]"
};

export const LAYOUT_CLASSES = {
  FULL_SCREEN: "min-h-screen",
  FULL_SCREEN_RELATIVE: "relative min-h-screen",
  SEARCH_SECTION: "sticky top-0 z-10 bg-background-dark/80 backdrop-blur-md border-b border-background-medium/50",
  CONTENT_CENTER: "flex justify-center w-full",
  CALENDAR_LAYOUT: "w-full max-w-full py-4 sm:py-6 lg:py-8",
  CALENDAR_WRAPPER: "w-full"
};