# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][unreleased]
### Changed
- Nothing yet.

## [2.2.0] - 2015-07-22
### Added
- Support for hashed JavaScript assets.
- 'static' option to render static markup.
- Standard globals are now included when evaluating source code.

## [2.1.0] - 2015-03-12
### Added
- A `template` function can now be provided to generate the rendered component's surrounding HTML.

## [2.0.1] - 2015-03-05
### Changed
- React is now listed in `peerDependencies`, ensuring version parity with the consuming project. An immediate benefit is that class-based components built with React v0.13+ now work without any issues.

## [2.0.0] - 2015-02-26
### Changed
- Components should now be exported directly, rather than factories.

## 1.0.0 - 2015-02-25
### Added
- Basic support for rendering factories without props to HTML.

[unreleased]: https://github.com/markdalgleish/react-to-html-webpack-plugin/compare/v2.2.0...HEAD
[2.2.0]: https://github.com/markdalgleish/react-to-html-webpack-plugin/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/markdalgleish/react-to-html-webpack-plugin/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/markdalgleish/react-to-html-webpack-plugin/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/markdalgleish/react-to-html-webpack-plugin/compare/v1.0.0...v2.0.0
