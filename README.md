
## Features:

1. The Input/Ingestion (Portal)
URL: /portal
Functionality: Users can upload a PDF (mock) and enter a company name.
AI Agent: A mock AI engine analyzes the document after a 2-second delay, generating a score and analysis.
2. Assessor Review
URL: /assessor
Functionality: Assessors see pending reports. They can review the AI's analysis and override the score with a human-verified score.
3. The Verdict (ESG Committee)
URL: /committee
Functionality: The committee reviews the verified report and awards a Tier (Gold, Silver, Bronze). This action finalizes the report.
4. Public Dashboard
URL: / (Home)
Functionality: Displays all "Finalized" reports with their badges. This is the transparency layer for investors/public.
5. Full Report
URL: /report/[id]
Functionality: Detailed view of the report, including AI findings, human score, and tier.
6. The Overseer (Admin)
URL: /admin
Functionality: A table view of all reports in the system, showing their current status and scores.

## Notes:
No real database: The application will use React Context and Local Storage to simulate a database.
AI Engine: The "AI Agent" will be a mock function returning random scores and analysis.


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

