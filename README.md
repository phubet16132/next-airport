# Next Airport App

**🌍 Live Demo:** [https://next-airport.vercel.app/checkin](https://next-airport.vercel.app/checkin)
Features:
- Flight search
- Boarding pass generation
- Modern UI using Tailwind CSS

## Commands
* `npm run dev` - Start development server
* `npm run build` - Build for production
* `npm run start` - Start production server
* `npm run test` - Run Jest test suite 
* `npm run test:watch` - Run Jest test suite in watch mode

## Work History 

**Prompt 1:** `create cicd with vercel`
**Prompt 2:** `yes`
**Prompt 3:** `why dont remove vercel.json too`
**Prompt 4:** `refactor make component for reuse able and make skel loading`
**Prompt 5:** `applie and mock for all possible page`
**Prompt 6:** `commit to git for skeleton`
**Prompt 7:** `can u add all my prompt to readme /Users/ar667406/Documents/web-training/next-airport/README.md`
**Prompt 8:** `can u add test for ui with jest or something that better`
**Prompt 9:** `create test with jest`
**Prompt 10:** `can u applie for all page and compoent for functional test and correctiveness  but git commit first`
**Prompt 11:** `do test case has like check style or pixel if has plz remove`
**Prompt 12:** `can you explain your concept of your testcase`
**Prompt 13:** `i mean like what to test what to check`
**Prompt 14:** `create mock constant data for mock api for every page an make it use that data not static data we use`
**Prompt 15:** `in first page cau u make if no data found create red inline error no booking found and add it in test case too`
**Prompt 16:** `data not match in page 1 but can go to anothor page`
**Prompt 17:** `fix when i select 1 person make it has only 1 i passenger detail`
**Prompt 18:** `add read me for how to test what data can use and cannot use`

## How to Test the Check-in Flow

The application replaces backend API calls with local React simulated delays and predefined array logic (`mockApi.ts`). 
To successfully navigate the **Retrieve Booking** page (`/checkin`), you must enter one of the following exact combinations.

### ✅ Valid Adult Data (Will successfully route you to page 2)
The mock database looks specifically for exact Last Name matches and matching PNRs.

**Booking 1 (Standard):**
- **Last Name:** `Huum` or `Kuum`
- **PNR:** `ABC123`
*(Contains 2 Adults, 1 Infant. Demonstrates Infant selection restriction).*

**Booking 2 (Single):**
- **Last Name:** `Solo`
- **PNR:** `SOLO11`
*(Contains 1 Adult).*

**Booking 3 (Unaccompanied Minor):**
- **Last Name:** `Timmy` 
- **PNR:** `UMNR99`
*(Contains 1 Child, 1 Infant. Demonstrates Unaccompanied Minor validation error).*

*(Note: Data entry is implicitly case-insensitive, meaning `huum` and `abc123` will work too).*

### ❌ Invalid Data (Will block access & show an inline error)
Any other data sequence will throw a simulation validation error.
- **Incorrect PNR**: Searching `Huum` with PNR `XYZ999`.
- **Incorrect Last Name**: Searching `Doe` with PNR `ABC123`.
- **Partial matches**: Searching `H` with PNR `ABC123` will fail (strict matching is enforced).

## Setup Notes

- Testing environment powered by `Jest` and `@testing-library/react`.
- See `vitest` config traces removed in favor of native Next.js Jest configs according to the Next.js recommendations.
- Skeletons are implemented for Select Passengers, Passenger Details, Dangerous Goods, and Boarding Pass generation screens.

## Project Structure

A comprehensive overview of the repository, including business flow documentation and the Next.js application structure.

```text
.
├── Booking-flow.md             # Business rules for the booking process
├── Checkin-flow.md             # Business rules for the check-in process
├── README.md                   # Project documentation and test guide
└── app                         # Next.js Application Root
    ├── src
    │   ├── app                 # Next.js App Router root
    │   │   ├── __tests__       # Page-level UI tests (Jest)
    │   │   ├── checkin         # Booking Check-in Flow feature routes
    │   │   │   ├── boarding-pass
    │   │   │   ├── dangerous-goods
    │   │   │   ├── pax-info
    │   │   │   └── select-pax
    │   │   ├── globals.css     # Global Tailwind utilities
    │   │   └── layout.tsx      # Root application layout shell
    │   ├── components          # Reusable React UI blocks
    │   │   ├── boarding-pass   # Final ticket renderers
    │   │   ├── layout          # Navigational wrappers (Header & Mobile Nav)
    │   │   └── skeletons       # Pulse-loading animated layout shells
    │   └── lib
    │       └── mockApi.ts      # Passenger/PNR pseudo-database & delays
    └── public                  # Static assets
        └── Apple_Wallet_Icon.svg
```