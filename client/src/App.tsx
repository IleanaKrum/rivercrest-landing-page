import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Giving from "./pages/Giving";
import CenterOfStudies from "./pages/CenterOfStudies";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StudentSubmissions from "./pages/StudentSubmissions";
import AdminSubmissions from "./pages/AdminSubmissions";
import CourseRegistration from "./pages/CourseRegistration";
import Resources from "./pages/Resources";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/giving"} component={Giving} />
      <Route path={"/center-of-studies"} component={CenterOfStudies} />
      <Route path={"/course-registration/:courseId?"} component={CourseRegistration} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/student-dashboard"} component={StudentDashboard} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/student-submissions"} component={StudentSubmissions} />
      <Route path={"/admin-submissions"} component={AdminSubmissions} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
