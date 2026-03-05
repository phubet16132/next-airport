# Next Airport App

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

### ✅ Valid Data (Will successfully route you to page 2)
The mock database looks specifically for exact Last Name matches and matching PNRs.

**Passenger 1:**
- **Last Name:** `Huum`
- **Booking Reference (PNR):** `ABC123`

**Passenger 2:**
- **Last Name:** `Kuum`
- **Booking Reference (PNR):** `ABC123`

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