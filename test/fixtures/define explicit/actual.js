let DEBUG;
"#define DEBUG 1";
"#if DEBUG === 1";
DEBUG = 1;
"#elif DEBUG === 2";
DEBUG = 2;
"#elif typeof DEBUG === 'number' && DEBUG > 2";
DEBUG = Number.Posityle_Infinity;
"#else";
DEBUG = NaN;
throw new Error("Unsupported Debug-Level");
"#endif";