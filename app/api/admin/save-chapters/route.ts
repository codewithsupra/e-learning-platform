import { ChaptersTable, CourseTable } from '@/config/schema';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db } from '@/config/db';
const DATA =
[
  {
    "id": 1,
    "name": "Introduction to HTML",
    "desc": "Discover the foundation of every webpage and learn how HTML shapes the digital world.",
    "exercises": [
      {"name": "Explore the Web Skeleton", "slug": "explore-the-web-skeleton", "xp": 20, "difficulty": "easy"},
      {"name": "Build Your Base Camp", "slug": "build-your-base-camp", "xp": 25, "difficulty": "easy"},
      {"name": "Name Your World", "slug": "name-your-world", "xp": 15, "difficulty": "easy"},
      {"name": "Break & Repair", "slug": "break-and-repair", "xp": 20, "difficulty": "easy"},
      {"name": "HTML Detective", "slug": "html-detective", "xp": 20, "difficulty": "easy"},
      {"name": "Element Collector", "slug": "element-collector", "xp": 25, "difficulty": "easy"}
    ]
  },
  {
    "id": 2,
    "name": "HTML Boilerplate",
    "desc": "Understand the core structure that every HTML document begins with.",
    "exercises": [
      {"name": "Build the Core Structure", "slug": "build-the-core-structure", "xp": 35, "difficulty": "medium"},
      {"name": "Fix the Broken Blueprint", "slug": "fix-the-broken-blueprint", "xp": 30, "difficulty": "easy"},
      {"name": "Boost Meta Power", "slug": "boost-meta-power", "xp": 20, "difficulty": "easy"},
      {"name": "Add Language Identity", "slug": "add-language-identity", "xp": 10, "difficulty": "easy"},
      {"name": "Viewport Setup", "slug": "viewport-setup", "xp": 20, "difficulty": "easy"},
      {"name": "Author Credit", "slug": "author-credit", "xp": 15, "difficulty": "easy"}
    ]
  },
  {
    "id": 3,
    "name": "Head & Body Tags",
    "desc": "Learn the difference between behind-the-scenes metadata and visible page content.",
    "exercises": [
      {"name": "Mind vs Body", "slug": "mind-vs-body", "xp": 20, "difficulty": "easy"},
      {"name": "Activate Styles", "slug": "activate-styles", "xp": 30, "difficulty": "medium"},
      {"name": "Display Your Content", "slug": "display-your-content", "xp": 15, "difficulty": "easy"},
      {"name": "Add External Script", "slug": "add-external-script", "xp": 20, "difficulty": "easy"},
      {"name": "Meta Collection", "slug": "meta-collection", "xp": 25, "difficulty": "easy"},
      {"name": "Body Structure Challenge", "slug": "body-structure-challenge", "xp": 25, "difficulty": "easy"}
    ]
  },
  {
    "id": 4,
    "name": "Text Formatting",
    "desc": "Format your content with headings, paragraphs, bold, italic, and more.",
    "exercises": [
      {"name": "Create the Text Realm", "slug": "create-the-text-realm", "xp": 30, "difficulty": "easy"},
      {"name": "Power Words", "slug": "power-words", "xp": 20, "difficulty": "easy"},
      {"name": "Build a Story Block", "slug": "build-a-story-block", "xp": 30, "difficulty": "medium"},
      {"name": "Line Break Mastery", "slug": "line-break-mastery", "xp": 15, "difficulty": "easy"},
      {"name": "Quote Chamber", "slug": "quote-chamber", "xp": 25, "difficulty": "easy"},
      {"name": "Code Snippet Display", "slug": "code-snippet-display", "xp": 30, "difficulty": "medium"}
    ]
  },
  {
    "id": 5,
    "name": "Links & Navigation",
    "desc": "Create portals between pages and build simple navigation.",
    "exercises": [
      {"name": "Create a Warp Gate", "slug": "create-a-warp-gate", "xp": 20, "difficulty": "easy"},
      {"name": "Open a New Dimension", "slug": "open-a-new-dimension", "xp": 25, "difficulty": "easy"},
      {"name": "Navigation Builder", "slug": "navigation-builder", "xp": 40, "difficulty": "medium"},
      {"name": "Anchor Teleport", "slug": "anchor-teleport", "xp": 20, "difficulty": "easy"},
      {"name": "Email Portal", "slug": "email-portal", "xp": 20, "difficulty": "easy"},
      {"name": "Button Link Trick", "slug": "button-link-trick", "xp": 25, "difficulty": "medium"}
    ]
  },
  {
    "id": 6,
    "name": "Images",
    "desc": "Display images, control sizing, and optimize accessibility.",
    "exercises": [
      {"name": "Summon an Image", "slug": "summon-an-image", "xp": 20, "difficulty": "easy"},
      {"name": "Vision for All", "slug": "vision-for-all", "xp": 15, "difficulty": "easy"},
      {"name": "Image Grid Challenge", "slug": "image-grid-challenge", "xp": 35, "difficulty": "medium"},
      {"name": "Resize Hero", "slug": "resize-hero", "xp": 20, "difficulty": "easy"},
      {"name": "Caption Creator", "slug": "caption-creator", "xp": 25, "difficulty": "medium"},
      {"name": "Broken Image Test", "slug": "broken-image-test", "xp": 15, "difficulty": "easy"}
    ]
  },
  {
    "id": 7,
    "name": "Lists",
    "desc": "Structure grouped information using ordered, unordered, and description lists.",
    "exercises": [
      {"name": "Bullet Creator", "slug": "bullet-creator", "xp": 20, "difficulty": "easy"},
      {"name": "Number Builder", "slug": "number-builder", "xp": 20, "difficulty": "easy"},
      {"name": "Nested List Challenge", "slug": "nested-list-challenge", "xp": 35, "difficulty": "medium"},
      {"name": "Description Vault", "slug": "description-vault", "xp": 25, "difficulty": "easy"},
      {"name": "Task Checklist", "slug": "task-checklist", "xp": 20, "difficulty": "easy"},
      {"name": "Navigation with Lists", "slug": "navigation-with-lists", "xp": 35, "difficulty": "medium"}
    ]
  },
  {
    "id": 8,
    "name": "Tables",
    "desc": "Represent information in structured grid format.",
    "exercises": [
      {"name": "Table Blueprint", "slug": "table-blueprint", "xp": 30, "difficulty": "medium"},
      {"name": "Add Column Headers", "slug": "add-column-headers", "xp": 20, "difficulty": "easy"},
      {"name": "Merge the Cells", "slug": "merge-the-cells", "xp": 35, "difficulty": "medium"},
      {"name": "Student Report Table", "slug": "student-report-table", "xp": 25, "difficulty": "easy"},
      {"name": "Border Styling", "slug": "border-styling", "xp": 20, "difficulty": "easy"},
      {"name": "Header Footer Rows", "slug": "header-footer-rows", "xp": 30, "difficulty": "medium"}
    ]
  },
  {
    "id": 9,
    "name": "Forms Basics",
    "desc": "Collect user input using form controls like input, labels, and buttons.",
    "exercises": [
      {"name": "Create a Login Portal", "slug": "create-a-login-portal", "xp": 40, "difficulty": "medium"},
      {"name": "Design a Contact Form", "slug": "design-a-contact-form", "xp": 45, "difficulty": "medium"},
      {"name": "Placeholder Magic", "slug": "placeholder-magic", "xp": 15, "difficulty": "easy"},
      {"name": "Label Linker", "slug": "label-linker", "xp": 20, "difficulty": "easy"},
      {"name": "Choose Wisely", "slug": "choose-wisely", "xp": 25, "difficulty": "easy"},
      {"name": "Dropdown Selector", "slug": "dropdown-selector", "xp": 30, "difficulty": "medium"}
    ]
  },
  {
    "id": 10,
    "name": "Semantic HTML",
    "desc": "Use meaningful HTML elements to improve page structure and accessibility.",
    "exercises": [
      {"name": "Build the Layout", "slug": "build-the-layout", "xp": 35, "difficulty": "medium"},
      {"name": "Blog Structure", "slug": "blog-structure", "xp": 40, "difficulty": "medium"},
      {"name": "Sidebar Creator", "slug": "sidebar-creator", "xp": 25, "difficulty": "easy"},
      {"name": "Navigation Map", "slug": "navigation-map", "xp": 35, "difficulty": "medium"},
      {"name": "Figure & Caption", "slug": "figure-and-caption", "xp": 25, "difficulty": "easy"},
      {"name": "Semantic Rebuild", "slug": "semantic-rebuild", "xp": 40, "difficulty": "medium"}
    ]
  },
  {
    "id": 11,
    "name": "Audio & Video",
    "desc": "Add multimedia components for richer experiences.",
    "exercises": [
      {"name": "Play the Sound", "slug": "play-the-sound", "xp": 25, "difficulty": "easy"},
      {"name": "Video Portal", "slug": "video-portal", "xp": 30, "difficulty": "medium"},
      {"name": "Autoplay Test", "slug": "autoplay-test", "xp": 20, "difficulty": "easy"},
      {"name": "Add Subtitles", "slug": "add-subtitles", "xp": 40, "difficulty": "medium"},
      {"name": "Audio Playlist", "slug": "audio-playlist", "xp": 20, "difficulty": "easy"},
      {"name": "Thumbnail Setup", "slug": "thumbnail-setup", "xp": 25, "difficulty": "easy"}
    ]
  },
  {
    "id": 12,
    "name": "HTML Best Practices",
    "desc": "Write clear, clean, and accessible HTML optimized for real-world use.",
    "exercises": [
      {"name": "Code Cleanup", "slug": "code-cleanup", "xp": 20, "difficulty": "easy"},
      {"name": "Accessibility Upgrade", "slug": "accessibility-upgrade", "xp": 35, "difficulty": "medium"},
      {"name": "Alt Text Review", "slug": "alt-text-review", "xp": 20, "difficulty": "easy"},
      {"name": "Heading Order Fix", "slug": "heading-order-fix", "xp": 25, "difficulty": "easy"},
      {"name": "Link Check", "slug": "link-check", "xp": 20, "difficulty": "easy"},
      {"name": "Semantic Improvement", "slug": "semantic-improvement", "xp": 40, "difficulty": "medium"}
    ]
  }
]






/* ---------------------------------------------------
   HTML Beginner (courseId = 2)
   ⚠️ EXACTLY YOUR ORIGINAL DATA — UNTOUCHED
--------------------------------------------------- */



/* ---------------------------------------------------
   React Beginner (courseId = 1)
   FULL 12 CHAPTERS — MATCHING HTML FORMAT
--------------------------------------------------- */
const REACT_DATA = [
  {
    "id": 1,
    "name": "Welcome to React",
    "desc": "Understand what React is, why it's fast, and how components create reusable UI.",
    "exercises": [
      {"name": "Hello Component", "slug": "hello-component", "xp": 20, "difficulty": "easy"},
      {"name": "Inspect App Tree", "slug": "inspect-app-tree", "xp": 25, "difficulty": "easy"},
      {"name": "Render a Title", "slug": "render-a-title", "xp": 15, "difficulty": "easy"},
      {"name": "JSX Intro", "slug": "jsx-intro", "xp": 20, "difficulty": "easy"},
      {"name": "Virtual DOM Hunt", "slug": "virtual-dom-hunt", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Component Error", "slug": "fix-component-error", "xp": 25, "difficulty": "easy"}
    ]
  },

  {
    "id": 2,
    "name": "JSX Basics",
    "desc": "Blend HTML-like syntax with JavaScript expressions to create dynamic UI.",
    "exercises": [
      {"name": "JSX Layout Builder", "slug": "jsx-layout-builder", "xp": 35, "difficulty": "medium"},
      {"name": "Fix Broken JSX", "slug": "fix-broken-jsx", "xp": 30, "difficulty": "easy"},
      {"name": "Insert Variables", "slug": "insert-variables", "xp": 20, "difficulty": "easy"},
      {"name": "Embed Logic", "slug": "embed-logic", "xp": 10, "difficulty": "easy"},
      {"name": "Parent Wrapper", "slug": "parent-wrapper", "xp": 20, "difficulty": "easy"},
      {"name": "JSX Debugger", "slug": "jsx-debugger", "xp": 15, "difficulty": "easy"}
    ]
  },

  {
    "id": 3,
    "name": "Props",
    "desc": "Pass data into components to make them reusable and dynamic.",
    "exercises": [
      {"name": "Prop Messenger", "slug": "prop-messenger", "xp": 20, "difficulty": "easy"},
      {"name": "Reusable Card", "slug": "reusable-card", "xp": 30, "difficulty": "medium"},
      {"name": "Fix PropType Issues", "slug": "fix-proptype-issues", "xp": 15, "difficulty": "easy"},
      {"name": "Configurable Button", "slug": "configurable-button", "xp": 20, "difficulty": "easy"},
      {"name": "Dynamic Greetings", "slug": "dynamic-greetings", "xp": 25, "difficulty": "easy"},
      {"name": "Prop Flow Challenge", "slug": "prop-flow-challenge", "xp": 25, "difficulty": "easy"}
    ]
  },

  {
    "id": 4,
    "name": "State Basics",
    "desc": "Make your UI change over time using the useState hook.",
    "exercises": [
      {"name": "Counter App", "slug": "counter-app", "xp": 30, "difficulty": "easy"},
      {"name": "Fix State Update", "slug": "fix-state-update", "xp": 20, "difficulty": "easy"},
      {"name": "Toggle Switch", "slug": "toggle-switch", "xp": 30, "difficulty": "medium"},
      {"name": "Track Input", "slug": "track-input", "xp": 15, "difficulty": "easy"},
      {"name": "State Logger", "slug": "state-logger", "xp": 25, "difficulty": "easy"},
      {"name": "Async State Fix", "slug": "async-state-fix", "xp": 30, "difficulty": "medium"}
    ]
  },

  {
    "id": 5,
    "name": "Rendering Lists",
    "desc": "Create collections of UI elements by mapping over data arrays.",
    "exercises": [
      {"name": "List Renderer", "slug": "list-renderer", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Missing Keys", "slug": "fix-missing-keys", "xp": 25, "difficulty": "easy"},
      {"name": "Card Loop", "slug": "card-loop", "xp": 35, "difficulty": "medium"},
      {"name": "Dynamic Items", "slug": "dynamic-items", "xp": 20, "difficulty": "easy"},
      {"name": "Map Debugging", "slug": "map-debugging", "xp": 20, "difficulty": "easy"},
      {"name": "Nested Lists", "slug": "nested-lists", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 6,
    "name": "Event Handling",
    "desc": "Respond to user input like clicks, typing, and form interactions.",
    "exercises": [
      {"name": "Click Handler", "slug": "click-handler", "xp": 20, "difficulty": "easy"},
      {"name": "Input Mirror", "slug": "input-mirror", "xp": 15, "difficulty": "easy"},
      {"name": "Event Params Fix", "slug": "event-params-fix", "xp": 35, "difficulty": "medium"},
      {"name": "Form Submission", "slug": "form-submission", "xp": 20, "difficulty": "easy"},
      {"name": "Button Behavior", "slug": "button-behavior", "xp": 20, "difficulty": "easy"},
      {"name": "Event Chain", "slug": "event-chain", "xp": 30, "difficulty": "medium"}
    ]
  },

  {
    "id": 7,
    "name": "Conditional Rendering",
    "desc": "Display different UI depending on app state or user actions.",
    "exercises": [
      {"name": "Show/Hide Toggle", "slug": "show-hide-toggle", "xp": 20, "difficulty": "easy"},
      {"name": "Mini Error Boundary", "slug": "mini-error-boundary", "xp": 30, "difficulty": "medium"},
      {"name": "Login Switch", "slug": "login-switch", "xp": 15, "difficulty": "easy"},
      {"name": "Render Function", "slug": "render-function", "xp": 20, "difficulty": "easy"},
      {"name": "Conditional Card", "slug": "conditional-card", "xp": 25, "difficulty": "easy"},
      {"name": "Multi-State UI", "slug": "multi-state-ui", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 8,
    "name": "useEffect",
    "desc": "Run side effects like fetching data or reacting to dependency changes.",
    "exercises": [
      {"name": "Effect Printer", "slug": "effect-printer", "xp": 30, "difficulty": "easy"},
      {"name": "Fix Dependencies", "slug": "fix-dependencies", "xp": 20, "difficulty": "easy"},
      {"name": "API Fetch", "slug": "api-fetch", "xp": 40, "difficulty": "medium"},
      {"name": "Cleanup Logic", "slug": "cleanup-logic", "xp": 15, "difficulty": "easy"},
      {"name": "Effect Debugging", "slug": "effect-debugging", "xp": 20, "difficulty": "easy"},
      {"name": "Loop Fix", "slug": "loop-fix", "xp": 30, "difficulty": "medium"}
    ]
  },

  {
    "id": 9,
    "name": "Component Composition",
    "desc": "Combine small components to build scalable UI systems.",
    "exercises": [
      {"name": "Layout Builder", "slug": "layout-builder", "xp": 35, "difficulty": "medium"},
      {"name": "Prop Drilling Fix", "slug": "prop-drilling-fix", "xp": 40, "difficulty": "medium"},
      {"name": "Card Composition", "slug": "card-composition", "xp": 20, "difficulty": "easy"},
      {"name": "Children Magic", "slug": "children-magic", "xp": 25, "difficulty": "easy"},
      {"name": "Slot System", "slug": "slot-system", "xp": 25, "difficulty": "easy"},
      {"name": "Reusable UI", "slug": "reusable-ui", "xp": 40, "difficulty": "medium"}
    ]
  },

  {
    "id": 10,
    "name": "Context API",
    "desc": "Share global state across deeply nested components.",
    "exercises": [
      {"name": "Build Context", "slug": "build-context", "xp": 35, "difficulty": "medium"},
      {"name": "Provider Setup", "slug": "provider-setup", "xp": 20, "difficulty": "easy"},
      {"name": "Use Context", "slug": "use-context", "xp": 25, "difficulty": "easy"},
      {"name": "Fix Scope Issue", "slug": "fix-scope-issue", "xp": 30, "difficulty": "medium"},
      {"name": "Theme Switcher", "slug": "theme-switcher", "xp": 30, "difficulty": "medium"},
      {"name": "Global State Challenge", "slug": "global-state-challenge", "xp": 40, "difficulty": "medium"}
    ]
  },

  {
    "id": 11,
    "name": "React Forms",
    "desc": "Build powerful user input forms using controlled components.",
    "exercises": [
      {"name": "Login Form", "slug": "login-form", "xp": 40, "difficulty": "medium"},
      {"name": "Fix Controlled Input", "slug": "fix-controlled-input", "xp": 30, "difficulty": "easy"},
      {"name": "Validation Rules", "slug": "validation-rules", "xp": 20, "difficulty": "easy"},
      {"name": "Submit Handler", "slug": "submit-handler", "xp": 25, "difficulty": "easy"},
      {"name": "Reset Logic", "slug": "reset-logic", "xp": 20, "difficulty": "easy"},
      {"name": "Form Challenge", "slug": "form-challenge", "xp": 40, "difficulty": "medium"}
    ]
  },

  {
    "id": 12,
    "name": "React Best Practices",
    "desc": "Write scalable, maintainable React applications like a pro.",
    "exercises": [
      {"name": "Clean Component", "slug": "clean-component", "xp": 20, "difficulty": "easy"},
      {"name": "Optimize Rendering", "slug": "optimize-rendering", "xp": 35, "difficulty": "medium"},
      {"name": "Accessibility Review", "slug": "accessibility-review", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Naming Issues", "slug": "fix-naming-issues", "xp": 25, "difficulty": "easy"},
      {"name": "Refactor Layout", "slug": "refactor-layout", "xp": 20, "difficulty": "easy"},
      {"name": "Production Prep", "slug": "production-prep", "xp": 40, "difficulty": "medium"}
    ]
  }
];


/* ---------------------------------------------------
   Python Beginner (courseId = 3)
   FULL 12 CHAPTERS
--------------------------------------------------- */
const PYTHON_DATA = [
  {
    "id": 1,
    "name": "Welcome to Python",
    "desc": "Get familiar with the Python ecosystem and run your first program.",
    "exercises": [
      {"name": "Hello Python", "slug": "hello-python", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Syntax Error", "slug": "fix-syntax-error", "xp": 15, "difficulty": "easy"},
      {"name": "Print Mastery", "slug": "print-mastery", "xp": 25, "difficulty": "easy"},
      {"name": "Simple Math", "slug": "simple-math", "xp": 20, "difficulty": "easy"},
      {"name": "Variable Setup", "slug": "variable-setup", "xp": 20, "difficulty": "easy"},
      {"name": "Comment Cleanup", "slug": "comment-cleanup", "xp": 20, "difficulty": "easy"}
    ]
  },

  {
    "id": 2,
    "name": "Variables & Types",
    "desc": "Work with different data types and store values using variables.",
    "exercises": [
      {"name": "Create Variables", "slug": "create-variables", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Type Error", "slug": "fix-type-error", "xp": 15, "difficulty": "easy"},
      {"name": "String Formatting", "slug": "string-formatting", "xp": 25, "difficulty": "easy"},
      {"name": "Dynamic Types", "slug": "dynamic-types", "xp": 20, "difficulty": "easy"},
      {"name": "Cast Values", "slug": "cast-values", "xp": 20, "difficulty": "easy"},
      {"name": "Mixed Operations", "slug": "mixed-operations", "xp": 30, "difficulty": "medium"}
    ]
  },

  {
    "id": 3,
    "name": "Conditions",
    "desc": "Control program flow using if, elif, and else statements.",
    "exercises": [
      {"name": "Simple If", "slug": "simple-if", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Condition Bug", "slug": "fix-condition-bug", "xp": 15, "difficulty": "easy"},
      {"name": "Multiple Conditions", "slug": "multiple-conditions", "xp": 25, "difficulty": "easy"},
      {"name": "Logical Operators", "slug": "logical-operators", "xp": 20, "difficulty": "easy"},
      {"name": "Decision Maker", "slug": "decision-maker", "xp": 25, "difficulty": "easy"},
      {"name": "Conditional Challenge", "slug": "conditional-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 4,
    "name": "Loops",
    "desc": "Repeat tasks using for and while loops.",
    "exercises": [
      {"name": "For Loop Basics", "slug": "for-loop-basics", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Infinite Loop", "slug": "fix-infinite-loop", "xp": 15, "difficulty": "easy"},
      {"name": "Iterate Collection", "slug": "iterate-collection", "xp": 25, "difficulty": "easy"},
      {"name": "While Loop Logic", "slug": "while-loop-logic", "xp": 20, "difficulty": "easy"},
      {"name": "Loop Counter", "slug": "loop-counter", "xp": 20, "difficulty": "easy"},
      {"name": "Nested Loop Challenge", "slug": "nested-loop-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 5,
    "name": "Functions",
    "desc": "Write reusable logic using functions and parameters.",
    "exercises": [
      {"name": "Create a Function", "slug": "create-a-function", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Return Bug", "slug": "fix-return-bug", "xp": 15, "difficulty": "easy"},
      {"name": "Parameterized Function", "slug": "parameterized-function", "xp": 25, "difficulty": "easy"},
      {"name": "Default Arguments", "slug": "default-arguments", "xp": 20, "difficulty": "easy"},
      {"name": "Function Reuse", "slug": "function-reuse", "xp": 20, "difficulty": "easy"},
      {"name": "Function Challenge", "slug": "function-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 6,
    "name": "Lists",
    "desc": "Store ordered collections using lists and manipulate them.",
    "exercises": [
      {"name": "Create List", "slug": "create-list", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Index Bug", "slug": "fix-index-bug", "xp": 15, "difficulty": "easy"},
      {"name": "Append Items", "slug": "append-items", "xp": 25, "difficulty": "easy"},
      {"name": "List Slicing", "slug": "list-slicing", "xp": 20, "difficulty": "easy"},
      {"name": "Remove Items", "slug": "remove-items", "xp": 20, "difficulty": "easy"},
      {"name": "List Challenge", "slug": "list-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 7,
    "name": "Dictionaries",
    "desc": "Store key-value pairs and access information efficiently.",
    "exercises": [
      {"name": "Create Dict", "slug": "create-dict", "xp": 20, "difficulty": "easy"},
      {"name": "Fix KeyError", "slug": "fix-keyerror", "xp": 15, "difficulty": "easy"},
      {"name": "Update Dict", "slug": "update-dict", "xp": 25, "difficulty": "easy"},
      {"name": "Nested Dict", "slug": "nested-dict", "xp": 20, "difficulty": "easy"},
      {"name": "Dictionary Tools", "slug": "dictionary-tools", "xp": 20, "difficulty": "easy"},
      {"name": "Dict Challenge", "slug": "dict-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 8,
    "name": "Strings",
    "desc": "Manipulate text data with slicing, formatting, and built-in functions.",
    "exercises": [
      {"name": "Fix String Bug", "slug": "fix-string-bug", "xp": 15, "difficulty": "easy"},
      {"name": "String Slicer", "slug": "string-slicer", "xp": 20, "difficulty": "easy"},
      {"name": "Format Text", "slug": "format-text", "xp": 25, "difficulty": "easy"},
      {"name": "String Tools", "slug": "string-tools", "xp": 20, "difficulty": "easy"},
      {"name": "Escape Sequence", "slug": "escape-sequence", "xp": 20, "difficulty": "easy"},
      {"name": "String Challenge", "slug": "string-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 9,
    "name": "Modules",
    "desc": "Reuse code with Python’s powerful module system.",
    "exercises": [
      {"name": "Import Module", "slug": "import-module", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Import Error", "slug": "fix-import-error", "xp": 15, "difficulty": "easy"},
      {"name": "Use Math Module", "slug": "use-math-module", "xp": 25, "difficulty": "easy"},
      {"name": "Custom Module", "slug": "custom-module", "xp": 20, "difficulty": "easy"},
      {"name": "Reload Module", "slug": "reload-module", "xp": 20, "difficulty": "easy"},
      {"name": "Module Challenge", "slug": "module-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 10,
    "name": "File Handling",
    "desc": "Read and write files to store data persistently.",
    "exercises": [
      {"name": "Create File", "slug": "create-file", "xp": 20, "difficulty": "easy"},
      {"name": "Fix File Error", "slug": "fix-file-error", "xp": 15, "difficulty": "easy"},
      {"name": "Write to File", "slug": "write-to-file", "xp": 25, "difficulty": "easy"},
      {"name": "Read File Data", "slug": "read-file-data", "xp": 20, "difficulty": "easy"},
      {"name": "File Mode Challenge", "slug": "file-mode-challenge", "xp": 20, "difficulty": "easy"},
      {"name": "File I/O Challenge", "slug": "file-io-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 11,
    "name": "Classes & Objects",
    "desc": "Learn object-oriented programming and how Python structures data.",
    "exercises": [
      {"name": "Create Class", "slug": "create-class", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Constructor", "slug": "fix-constructor", "xp": 15, "difficulty": "easy"},
      {"name": "Instance Builder", "slug": "instance-builder", "xp": 25, "difficulty": "easy"},
      {"name": "Add Methods", "slug": "add-methods", "xp": 20, "difficulty": "easy"},
      {"name": "OOP Tools", "slug": "oop-tools", "xp": 20, "difficulty": "easy"},
      {"name": "OOP Challenge", "slug": "oop-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 12,
    "name": "Python Best Practices",
    "desc": "Write clean, safe, and efficient Python code like a professional.",
    "exercises": [
      {"name": "Clean Code", "slug": "clean-code", "xp": 20, "difficulty": "easy"},
      {"name": "Refactor Script", "slug": "refactor-script", "xp": 35, "difficulty": "medium"},
      {"name": "PEP8 Fixes", "slug": "pep8-fixes", "xp": 20, "difficulty": "easy"},
      {"name": "Error Handling", "slug": "error-handling", "xp": 25, "difficulty": "easy"},
      {"name": "Optimize Logic", "slug": "optimize-logic", "xp": 20, "difficulty": "easy"},
      {"name": "Pro Coding Challenge", "slug": "pro-coding-challenge", "xp": 40, "difficulty": "medium"}
    ]
  }
];


/* ---------------------------------------------------
   CSS Beginner (courseId = 4)  
   FULL 12 CHAPTERS
--------------------------------------------------- */
const CSS_DATA = [
  {
    "id": 1,
    "name": "Intro to CSS",
    "desc": "Learn how CSS controls the visual appearance of web pages.",
    "exercises": [
      {"name": "Color Playground", "slug": "color-playground", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Style Block", "slug": "fix-style-block", "xp": 15, "difficulty": "easy"},
      {"name": "Apply Class Style", "slug": "apply-class-style", "xp": 25, "difficulty": "easy"},
      {"name": "Font Explorer", "slug": "font-explorer", "xp": 20, "difficulty": "easy"},
      {"name": "Background Magic", "slug": "background-magic", "xp": 20, "difficulty": "easy"},
      {"name": "CSS Debugger", "slug": "css-debugger", "xp": 20, "difficulty": "easy"}
    ]
  },

  {
    "id": 2,
    "name": "Selectors",
    "desc": "Master the ways to target HTML elements with powerful CSS selectors.",
    "exercises": [
      {"name": "Basic Selectors", "slug": "basic-selectors", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Selector Bug", "slug": "fix-selector-bug", "xp": 15, "difficulty": "easy"},
      {"name": "Descendant Challenge", "slug": "descendant-challenge", "xp": 25, "difficulty": "easy"},
      {"name": "Attribute Selectors", "slug": "attribute-selectors", "xp": 20, "difficulty": "easy"},
      {"name": "Pseudo Classes", "slug": "pseudo-classes", "xp": 20, "difficulty": "easy"},
      {"name": "Selector Mastery", "slug": "selector-mastery", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 3,
    "name": "The Box Model",
    "desc": "Understand padding, margin, border, and how boxes behave in layouts.",
    "exercises": [
      {"name": "Padding Playground", "slug": "padding-playground", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Box Model Issue", "slug": "fix-box-model-issue", "xp": 15, "difficulty": "easy"},
      {"name": "Border Practice", "slug": "border-practice", "xp": 25, "difficulty": "easy"},
      {"name": "Margin Space", "slug": "margin-space", "xp": 20, "difficulty": "easy"},
      {"name": "Box Sizing", "slug": "box-sizing", "xp": 20, "difficulty": "easy"},
      {"name": "Box Model Challenge", "slug": "box-model-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 4,
    "name": "Colors & Typography",
    "desc": "Style text, apply fonts, and use modern color systems.",
    "exercises": [
      {"name": "Font Styling", "slug": "font-styling", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Text Contrast", "slug": "fix-text-contrast", "xp": 15, "difficulty": "easy"},
      {"name": "Google Font Add", "slug": "google-font-add", "xp": 25, "difficulty": "easy"},
      {"name": "Text Shadows", "slug": "text-shadows", "xp": 20, "difficulty": "easy"},
      {"name": "Color Palettes", "slug": "color-palettes", "xp": 20, "difficulty": "easy"},
      {"name": "Typography Challenge", "slug": "typography-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 5,
    "name": "Flexbox",
    "desc": "Learn the most powerful layout module in modern CSS.",
    "exercises": [
      {"name": "Flex Container", "slug": "flex-container", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Flex Direction", "slug": "fix-flex-direction", "xp": 15, "difficulty": "easy"},
      {"name": "Alignment Practice", "slug": "alignment-practice", "xp": 25, "difficulty": "easy"},
      {"name": "Flex Wrap", "slug": "flex-wrap", "xp": 20, "difficulty": "easy"},
      {"name": "Spacing Layout", "slug": "spacing-layout", "xp": 20, "difficulty": "easy"},
      {"name": "Flexbox Challenge", "slug": "flexbox-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 6,
    "name": "Grid Layout",
    "desc": "Build advanced layouts with CSS Grid’s rows, columns, and templates.",
    "exercises": [
      {"name": "Grid Template", "slug": "grid-template", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Grid Gaps", "slug": "fix-grid-gaps", "xp": 15, "difficulty": "easy"},
      {"name": "Named Areas", "slug": "named-areas", "xp": 25, "difficulty": "easy"},
      {"name": "Auto Fit Grid", "slug": "auto-fit-grid", "xp": 20, "difficulty": "easy"},
      {"name": "MinMax Practice", "slug": "minmax-practice", "xp": 20, "difficulty": "easy"},
      {"name": "Grid Challenge", "slug": "grid-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 7,
    "name": "Positioning",
    "desc": "Master absolute, relative, fixed, and sticky positioning.",
    "exercises": [
      {"name": "Position Shapes", "slug": "position-shapes", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Overlap Bug", "slug": "fix-overlap-bug", "xp": 15, "difficulty": "easy"},
      {"name": "Sticky Header", "slug": "sticky-header", "xp": 25, "difficulty": "easy"},
      {"name": "Absolute Card", "slug": "absolute-card", "xp": 20, "difficulty": "easy"},
      {"name": "Relative Layout", "slug": "relative-layout", "xp": 20, "difficulty": "easy"},
      {"name": "Position Challenge", "slug": "position-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 8,
    "name": "Transitions & Animations",
    "desc": "Add smooth transitions, motion, and UI animations.",
    "exercises": [
      {"name": "Fade Button", "slug": "fade-button", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Transition", "slug": "fix-transition", "xp": 15, "difficulty": "easy"},
      {"name": "Hover Animation", "slug": "hover-animation", "xp": 25, "difficulty": "easy"},
      {"name": "Keyframe Motion", "slug": "keyframe-motion", "xp": 20, "difficulty": "easy"},
      {"name": "Loop Animation", "slug": "loop-animation", "xp": 20, "difficulty": "easy"},
      {"name": "Animation Challenge", "slug": "animation-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 9,
    "name": "Responsive Design",
    "desc": "Make websites adapt beautifully to different screen sizes.",
    "exercises": [
      {"name": "Media Query Basics", "slug": "media-query-basics", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Mobile Layout", "slug": "fix-mobile-layout", "xp": 15, "difficulty": "easy"},
      {"name": "Responsive Images", "slug": "responsive-images", "xp": 25, "difficulty": "easy"},
      {"name": "Tablet Layout", "slug": "tablet-layout", "xp": 20, "difficulty": "easy"},
      {"name": "Fluid Typography", "slug": "fluid-typography", "xp": 20, "difficulty": "easy"},
      {"name": "Responsive Challenge", "slug": "responsive-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 10,
    "name": "Shadows & Depth",
    "desc": "Use shadows and elevation to create polished, modern interfaces.",
    "exercises": [
      {"name": "Soft Shadows", "slug": "soft-shadows", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Box Shadow", "slug": "fix-box-shadow", "xp": 15, "difficulty": "easy"},
      {"name": "Card Depth", "slug": "card-depth", "xp": 25, "difficulty": "easy"},
      {"name": "Shadow Blur", "slug": "shadow-blur", "xp": 20, "difficulty": "easy"},
      {"name": "Layered UI", "slug": "layered-ui", "xp": 20, "difficulty": "easy"},
      {"name": "Shadow Challenge", "slug": "shadow-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 11,
    "name": "Pseudo Elements",
    "desc": "Create powerful UI enhancements using ::before and ::after.",
    "exercises": [
      {"name": "Decorative Line", "slug": "decorative-line", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Pseudo Bug", "slug": "fix-pseudo-bug", "xp": 15, "difficulty": "easy"},
      {"name": "Add Icon", "slug": "add-icon", "xp": 25, "difficulty": "easy"},
      {"name": "Custom Badge", "slug": "custom-badge", "xp": 20, "difficulty": "easy"},
      {"name": "Highlight Effect", "slug": "highlight-effect", "xp": 20, "difficulty": "easy"},
      {"name": "Pseudo Challenge", "slug": "pseudo-challenge", "xp": 35, "difficulty": "medium"}
    ]
  },

  {
    "id": 12,
    "name": "CSS Best Practices",
    "desc": "Write clean, scalable, maintainable CSS like a real frontend engineer.",
    "exercises": [
      {"name": "Clean Selector", "slug": "clean-selector", "xp": 20, "difficulty": "easy"},
      {"name": "Fix Specificity", "slug": "fix-specificity", "xp": 15, "difficulty": "easy"},
      {"name": "Reduce Repetition", "slug": "reduce-repetition", "xp": 25, "difficulty": "easy"},
      {"name": "Refactor Styles", "slug": "refactor-styles", "xp": 20, "difficulty": "easy"},
      {"name": "Improve Naming", "slug": "improve-naming", "xp": 20, "difficulty": "easy"},
      {"name": "Pro CSS Challenge", "slug": "pro-css-challenge", "xp": 40, "difficulty": "medium"}
    ]
  }
];


/* ---------------------------------------------------
   DO NOT TOUCH — Seeder Logic
--------------------------------------------------- */
const ALL = [
  { courseId: 1, data: REACT_DATA },
  { courseId: 2, data: DATA },
  { courseId: 3, data: PYTHON_DATA },
  { courseId: 4, data: CSS_DATA },
];

export async function GET(req: NextRequest) {
  try {
    for (const course of ALL) { 
      for (const ch of course.data) {
        await db.insert(ChaptersTable).values({
          courseId: course.courseId,
          chapterId: ch.id,
          name: ch.name,
          desc: ch.desc,
          exercises: ch.exercises
        });
      }
    }

    return NextResponse.json({ message: "All Chapters Seeded Successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Seeding Failed" }, { status: 500 });
  }
}



