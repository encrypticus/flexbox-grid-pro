# Flexbox Grid Pro
[flexbox-grid-pro.github.io/grid](https://flexbox-grid-pro.github.io/grid)

## Description
Flexbox Grid Pro is a rich modular grid system for creating adaptive, responsive layouts. The grid is available in two versions - as a set of predefined css classes and as a set of sass mixins ( sass & scss syntax ). That is, you can either put necessary classes in the html markup to the necessary elements or connect the necessary mixins in your sass code in the selectors. Both options are equivalent and give similar results. Which one to use is just a matter of your preference.

## Install
```
npm i flexbox-grid-pro
```

## Sass source files and grid customization
Along with the finished css file, the library is available as Sass source files. Both sass and scss syntax are available. When using Sass, you can use a set of ready-made variables and mixins to customize the grid and its flexible settings. All predefined grid classes use the same variables and mixins to provide a whole set of ready-to-use classes for quickly creating adaptive layouts.

### Variables
Variables and maps determine the width of the grid container and its internal horizontal indents, the number of columns and the horizontal and vertical distance between them, control points for media queries, as well as parts of the library that will be included in the generated css file. They are used to generate the specified grid classes, as well as for the mixins used in the examples above.

### Mixins
The directory ```grid/mixins/``` contains mixins that are used with mesh variables to generate css. All generated library classes use the same mixins.

### Grid
The file ```grid/grid.scss``` contains all the variables and grid settings that you can override:
```scss
$container-width: 1140px !default;
$container-padding: 15px !default;
$h-gutter: 30px !default;
$v-gutter: $h-gutter !default;
$columns: 12 !default;
$mobile-first: false !default;

@function query-direction() {
  @if($mobile-first) {
    @return min;
  } @else {
    @return max;
  }
}

$media-query: query-direction();

$grid-breakpoints: (
  desktop: 1280px,
  laptop: 1024px,
  laptop-md: 960px,
  tablet-landscape: 768px,
  phone-landscape: 640px,
  phone: 480px,
  phone-md: 360px,
  phone-sm: 320px
) !default;

$partials: (
  alignment,
  direction,
  hide,
  offset,
  ordering,
  show,
  gutters
) !default;

@import 'mixins/mixins';
@import 'partials/alignment';
@import 'partials/ordering';
@import 'partials/direction';
@import 'partials/hide';
@import 'partials/show';
@import 'partials/offset';
@import 'partials/gutters.scss';
@import 'base';
```

In order to override the default variables, give them your values before importing the main library file ```grid/grid.scss```:
```scss
$container-width: 1920px;
$container-padding: 10px;
$h-gutter: 15px;
$columns: 24;
$mobile-first: true;

$grid-breakpoints: (
  lg: 1280px,
  md: 960px,
  sm: 768px,
  xs: 480px
);

@import 'path/to/grid/grid.scss';
```

See [documentation](https://flexbox-grid-pro.github.io/grid) for more details.

### Compilation of source sass files
When using the Flexbox Grid Pro library as sass files, it is strongly recommended that you use the minifiers [group-css-media-queries](https://github.com/Se7enSky/group-css-media-queries) and [csso](https://github.com/css/csso). This will significantly reduce the amount of library css-file collected.