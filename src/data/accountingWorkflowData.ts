import { AccountingWorkflowStep } from '../types';

export const ACCOUNTING_WORKFLOW_STEPS: AccountingWorkflowStep[] = [
  {
    stepNumber: 1,
    name: 'Transaction',
    shortDesc: 'A financial event takes place supported by raw source documents.',
    purpose: 'Identify and analyze measurable monetary transactions affecting assets, liabilities, or equity.',
    keyRule: 'Every transaction must be supported by an authentic source document (receipt, invoice, voucher, bank advice).',
    documentType: 'Source Documents (Commercial Invoice, Purchase Order, Bank Slip, Cash Receipt)',
    practicalActivity: 'Students inspect raw commercial documents and identify which accounts are affected and whether they increase or decrease.',
    exampleData: {
      title: 'Sample Transaction: Office Equipment Purchase',
      details: 'Business purchases high-performance computer hardware for $2,500. $1,000 paid immediately via bank transfer; remaining $1,500 on 30-day supplier credit.',
      notes: 'Source Doc: Vendor Tax Invoice #INV-8891 & Bank Wire Confirmation.'
    }
  },
  {
    stepNumber: 2,
    name: 'Journal Entry',
    shortDesc: 'Recording the chronological double-entry record with debits and credits.',
    purpose: 'Translate the economic event into formal accounting language with balanced debits and credits.',
    keyRule: 'Total Debits MUST always equal Total Credits. Every entry must include a clear transaction narration.',
    documentType: 'General Journal Voucher (GJ / JV)',
    practicalActivity: 'Students write manual General Journal entries and enter them into Excel and accounting software with accurate account codes.',
    exampleData: {
      title: 'General Journal Voucher #GJ-2026-041',
      details: 'Office Equipment $2,500 recorded against Bank Wire ($1,000) and Vendor Payable ($1,500).',
      notes: 'Narration: Purchased computer workstation, partially funded by wire and remaining on 30-day terms.'
    }
  },
  {
    stepNumber: 3,
    name: 'Ledger',
    shortDesc: 'Posting journal entries into individual account balances (T-Accounts).',
    purpose: 'Accumulate all debits and credits into respective accounts to determine net ending balances.',
    keyRule: 'Journal entries are transferred without alteration into individual debit and credit columns of each account.',
    documentType: 'General Ledger & Subsidiary Ledgers (Accounts Receivable / Accounts Payable)',
    practicalActivity: 'Students maintain T-accounts in Excel and review automated general ledger feeds in QuickBooks, Xero, and Zoho Books.',
    exampleData: {
      title: 'General Ledger Account #1500: Office Equipment',
      details: 'Previous Balance: $12,400. Post Ref GJ-041: +$2,500. New Running Balance: $14,900.',
      notes: 'Subsidiary Ledger: TechMart Supplier Account reflects $1,500 pending credit liability.'
    }
  },
  {
    stepNumber: 4,
    name: 'Trial Balance',
    shortDesc: 'Listing all account balances to verify mathematical equality.',
    purpose: 'Ensure total debit balances equal total credit balances before proceeding to adjustments.',
    keyRule: 'Total Debits column MUST equal Total Credits column. If unbalanced, an error has occurred in posting or addition.',
    documentType: 'Unadjusted Trial Balance Report',
    practicalActivity: 'Students extract account balances and build dynamic error-detection formulas in Excel to catch transposition and omission errors.',
    exampleData: {
      title: 'Trial Balance Extract (Pre-Adjustment)',
      details: 'Total Debit Balances: $184,500 | Total Credit Balances: $184,500. Balanced status verified.',
      notes: 'Variance: $0.00. Ready for period-end adjusting entries.'
    }
  },
  {
    stepNumber: 5,
    name: 'Adjustments',
    shortDesc: 'Applying matching and accrual accounting rules at period-end.',
    purpose: 'Recognize unrecorded revenues and expenses to reflect true financial performance within the accounting period.',
    keyRule: 'Accrual basis requires recognizing revenue when earned and expenses when incurred, regardless of cash timing.',
    documentType: 'Adjusting Journal Vouchers (AJVs) for Depreciation, Accruals, Prepayments, Bad Debts',
    practicalActivity: 'Students calculate straight-line depreciation, compute accrued staff salaries, and record prepaid insurance amortization.',
    exampleData: {
      title: 'Adjusting Journal Entry: Monthly Depreciation',
      details: 'Monthly depreciation of $450 allocated against office equipment asset value.',
      notes: 'Matches monthly asset utilization against revenues generated during the current month.'
    }
  },
  {
    stepNumber: 6,
    name: 'Income Statement / P&L',
    shortDesc: 'Reporting revenues, cost of sales, operating expenses, and net profit.',
    purpose: 'Determine the operational profitability of the business over a specific time horizon.',
    keyRule: 'Net Income = Total Revenues - (Cost of Goods Sold + Operating Expenses + Taxes).',
    documentType: 'Statement of Profit or Loss / Income Statement',
    practicalActivity: 'Students construct multi-step Income Statements in Excel and compare them against live software reports.',
    exampleData: {
      title: 'Quarterly Income Statement Summary',
      details: 'Revenue: $92,000 | COGS: $36,800 | Gross Profit: $55,200 | Operating Expenses: $28,400 | Net Income: $26,800.',
      notes: 'Net profit of $26,800 flows directly into Retained Earnings on the Balance Sheet.'
    }
  },
  {
    stepNumber: 7,
    name: 'Balance Sheet',
    shortDesc: 'Financial snapshot of Assets, Liabilities, and Owner’s Equity at a given date.',
    purpose: 'Present what the enterprise owns, owes, and the net equity residual at the balance sheet date.',
    keyRule: 'Fundamental Accounting Equation: ASSETS = LIABILITIES + OWNER’S EQUITY.',
    documentType: 'Statement of Financial Position / Classified Balance Sheet',
    practicalActivity: 'Students verify balance sheet balance, classify current vs non-current items, and verify working capital.',
    exampleData: {
      title: 'Classified Balance Sheet Position',
      details: 'Total Assets ($248,000) = Total Liabilities ($96,200) + Total Equity ($151,800).',
      notes: 'Perfect equality confirmed: Assets match Liabilities plus Equity exactly.'
    }
  },
  {
    stepNumber: 8,
    name: 'Financial Analysis',
    shortDesc: 'Evaluating liquidity, profitability, solvency, and operational efficiency.',
    purpose: 'Translate raw numbers into actionable business intelligence for owners, bankers, and executives.',
    keyRule: 'Ratios provide context; numbers are meaningful only when evaluated against targets or historical benchmarks.',
    documentType: 'Executive Financial Dashboard & Management Variance Report',
    practicalActivity: 'Students compute Current Ratio, Gross Margin, Net Margin, and Working Capital to advise simulated business clients.',
    exampleData: {
      title: 'Management Key Performance Indicators (KPIs)',
      details: 'Current Ratio: 2.1x (Healthy Liquidity) | Gross Profit Margin: 60.0% | Net Profit Margin: 29.1%.',
      notes: 'Provides commercial insight for cash planning and capital allocation.'
    }
  }
];

export const REAL_WORLD_TRANSACTIONS = [
  {
    id: 'tx-sales',
    category: 'Sales',
    iconName: 'TrendingUp',
    description: 'B2B Client Services Invoiced',
    scenario: 'Issued Invoice #INV-1024 for accounting consultancy services rendered to Apex Logistics.',
    workflowNotes: 'Logged in Sales module. Generates customer invoice and increases trade receivables.'
  },
  {
    id: 'tx-purchases',
    category: 'Purchases',
    iconName: 'ShoppingBag',
    description: 'Inventory / Supplies Procurement',
    scenario: 'Received 50 commercial stationery and office supplies sets from Prime Distributors on 15-day credit.',
    workflowNotes: 'Entered as Vendor Bill. Increases accounts payable ledger pending payment run.'
  },
  {
    id: 'tx-expenses',
    category: 'Expenses',
    iconName: 'Receipt',
    description: 'Utility & Facility Payments',
    scenario: 'Paid monthly broadband and power utility bills directly through commercial bank portal.',
    workflowNotes: 'Recorded as bank spend transaction. Matched against monthly bank statement.'
  },
  {
    id: 'tx-cash',
    category: 'Cash Transactions',
    iconName: 'Coins',
    description: 'Petty Cash Replenishment & Minor Outlays',
    scenario: 'Withdrew petty cash from main bank account to replenish the imprest petty cash fund for courier and office tea.',
    workflowNotes: 'Internal contra cash transfer documented with petty cash voucher and register.'
  },
  {
    id: 'tx-bank',
    category: 'Bank Transactions',
    iconName: 'Building2',
    description: 'Direct Bank Wire & Electronic Settlements',
    scenario: 'Client wired settlement for previously issued invoice directly into business checking account.',
    workflowNotes: 'Applied against open invoice. Clears the customer outstanding ledger to zero.'
  },
  {
    id: 'tx-receivables',
    category: 'Customer Receivables',
    iconName: 'Clock',
    description: 'Aging Analysis & Debtor Follow-up',
    scenario: 'Track outstanding balances across 0-30 days, 31-60 days, and 60+ days brackets to ensure cash flow continuity.',
    workflowNotes: 'Generated in QuickBooks, Xero, and Zoho Books customer aging reports.'
  },
  {
    id: 'tx-payables',
    category: 'Supplier Payables',
    iconName: 'FileCheck',
    description: 'Vendor Bill Approvals & Scheduled Payouts',
    scenario: 'Scheduled batch electronic payment for 4 approved vendor bills reaching due date.',
    workflowNotes: 'Decreases trade liabilities and records cleared disbursements in general ledger.'
  },
  {
    id: 'tx-reconciliation',
    category: 'Bank Reconciliation',
    iconName: 'CheckCircle2',
    description: 'Reconciling Ledger vs Bank Statement',
    scenario: 'Monthly comparison between general ledger cash book and official bank statement to eliminate timing differences.',
    workflowNotes: 'Unreconciled difference must reach $0.00. Identifies unpresented checks and direct debits.'
  }
];
