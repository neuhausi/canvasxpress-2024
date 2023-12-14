# Instructions

## Active States
Append `active` class to any nav links to make it slightly bolder.
Append `font-weight-bold` to the active sidebar category (docs,examples,api)

## Places to update active States
Header Nav, Footer Nav, Docs Sidebar Nav

## Script and code embedding
Wrap the code in a pre and paste inside, it will render the stylized code block.
```
<pre class="prettyprint p-3">
{
"graphOrientation" : "vertical",
"legendPosition" : "right",
"smpLabelRotate" : 45,
"graphType" : "Area"
}
</pre>
```

## Sticky Sidebar
If the sidebar is super long (like examples) you can remove the `sticky-sidebar` class from the sidebars first child element on line 72 of any page. This will stop the long sidebar from sticking and allow the user to scroll to the top to view the sidebar.

## Tips

1. Convert the re-usable sections to something like a PHP include so you only have to update nav bars, sidebars and footers in 1 place.

## Building CSS/JS
When you clone the project, use yarn to install all the project dependencies.
```
yarn install
```
Then use the command `yarn watch` to compile your assets as you make changes. When your happy and want to build for production run the command `yarn prod` and it will build and minify the assets.

## Icons
You can use any icon in fontawesome pro library - https://fontawesome.com/cheatsheet/pro

## Spacing
Bootstrap has abilities to add margins and padding easily in the html via classes like `my-4` which would add 4 rems of padding to the top and bottom. Learn more here: https://getbootstrap.com/docs/4.0/utilities/spacing/
