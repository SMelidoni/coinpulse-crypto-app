# WIP

-

# v1.1.4 - 8th August 2024

- Added colour guide for the Fear and Greed index

# v1.1.3 - 24th March 2024

- Added the following dependencies resolving application vulnerabilities:
  - nth-check
  - webpack-dev-middleware

# v1.1.2 - 18th November 2023

- Fixed active navbar link colour issue
- Updated Navbar to set 'Home' as default active link
- Fixed mobile navbar to close on section click

# v1.1.1 - 31st October 2023

- Minor style updates to home and `.title`

# v1.1.0 - 20th October 2023

- Updated social (icon) links
- Updated FAG index tooltip styles (mobile / tablet)
- Updated 'Market' section to store row and page number state when returning from other page
- Enhanced user navigation with scroll position retention for coin list
- Introduced CoinGecko context and refactored Home & Market components to reduce number of API calls made

# v1.0.0 - 1st October 2023

- Initial project setup using create-react-app with TypeScript and SASS
- Added Prettier config file and re-formatted necessary files
- Added new favicon
- Implemented the initial setup of the Home page, integrated global style definitions via variables.scss, set global font-family to Quicksand
- Added top crypto coins display on Home section (includes: name, price (£), 24h price change)
- Integrated Fear and Greed Index from alternative.me API
- Added Navbar component (sticky header)
- Added Topbar component (sticky header)
- Updated mobile navbar 'close' button position
- Added initial 'Market' section (sample data)
  - Integrated the CoinGecko API to populate the 'Market' table with real-time cryptocurrency data
  - Added icon of each cryptocurrency next to its name
- Added pagination to 'Market' table (displaying 10 coins per page)
- Added ability to sort market table columns
- Added ability to select the number of rows displayed per page via dropdown
- Added initial 'Learn' section
  - Added clickable dropdowns that show Q&A explaining key cryptocurrency concepts.
- Added crypto detail page which displays detailed information for any crypto when clicking on any crypto from the table
  - Updated detailed description links to open in new tab when selected
- Improved error handling for API interactions in `Home`, `Market` and `CryptoDetail` components.
  - Gracefully handle rate-limiting scenarios and other potential API issues.
- Added initial quiz sub section
- Added Tooltip next to FAG index title to explain what the data shows
- Added footer with social media icon links within FAG component
