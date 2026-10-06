import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'accounting-fundamentals',
    title: 'Accounting Fundamentals',
    tagline: 'Master core accounting principles through practical double-entry mechanics',
    level: 'Foundational',
    duration: '4 to 6 Weeks',
    tools: ['Double Entry Framework', 'General Journal', 'T-Accounts', 'Financial Statements'],
    overview:
      'Gain an unshakeable foundation in real accounting mechanics. Move beyond dry definitions to understand how every financial transaction influences the accounting equation and flows through the accounting cycle to the final balance sheet.',
    whatYouWillLearn: [
      'Basic Accounting Concepts & Business Entity Principles',
      'The Golden Rules of Debit and Credit',
      'Recording General Journal Entries with proper narrations',
      'Posting to T-Account General Ledgers and balancing accounts',
      'Preparing and balancing an unadjusted Trial Balance',
      'End-of-period Adjustments (accruals, prepayments, depreciation, bad debts)',
      'Generating an accurate Income Statement / Profit & Loss statement',
      'Drafting the Classified Balance Sheet (Assets = Liabilities + Equity)'
    ],
    practicalSkills: [
      'Analyze 100+ raw source business transactions',
      'Diagnose and correct Trial Balance discrepancies',
      'Prepare period-end adjustment vouchers',
      'Reconcile revenue against earned income'
    ],
    keyModules: [
      {
        title: 'Core Concepts & Golden Rules',
        topics: ['Assets, Liabilities, Equity, Revenues, Expenses', 'Debit & Credit classification', 'Source documents analysis']
      },
      {
        title: 'The Journal & Ledger Cycle',
        topics: ['Compound journal entries', 'General and subsidiary ledgers', 'Account balance extraction']
      },
      {
        title: 'Trial Balance & Period Adjustments',
        topics: ['Trial Balance drafting', 'Accrued expenses & revenues', 'Depreciation schedules & provision for doubtful accounts']
      },
      {
        title: 'Financial Statements Preparation',
        topics: ['Multi-step Income Statement', 'Retained earnings statement', 'Classified Balance Sheet structures']
      }
    ]
  },
  {
    id: 'excel-accounting-practical',
    title: 'Excel Accounting Practical',
    tagline: 'Build automated accounting models, dynamic ledgers, and reporting workbooks',
    level: 'Hands-on Practical',
    duration: '5 to 6 Weeks',
    tools: ['Microsoft Excel', 'Spreadsheet Models', 'PivotTables', 'Dynamic Formulas'],
    overview:
      'Excel is the indispensable backbone of every accounting department. This course teaches you to design real, functional accounting worksheets from scratch, automate journal postings, compile dynamic Trial Balances, and present professional financial reports.',
    whatYouWillLearn: [
      'Excel accounting worksheets architecture and cell formatting',
      'Essential financial formulas (SUMIFS, XLOOKUP, VLOOKUP, INDEX/MATCH, IF, IFERROR)',
      'Efficient data entry controls and validation lists',
      'Automated General Journal and interactive Ledger in Excel',
      'Self-balancing dynamic Trial Balance using formulas',
      'Automated Profit & Loss statement template',
      'Dynamic Balance Sheet with built-in variance checks',
      'Practical accounting management reports and financial dashboards',
      'Basic Excel workflow automation and dynamic reporting templates'
    ],
    practicalSkills: [
      'Design an automated 12-column accounting workbook',
      'Build automated bank register with running balance formulas',
      'Generate instant departmental P&L with PivotTables',
      'Create error-checking flags for out-of-balance entries'
    ],
    keyModules: [
      {
        title: 'Worksheet Setup & Financial Formulas',
        topics: ['Structured tables design', 'SUMIFS & COUNTIFS for accounting', 'XLOOKUP & dynamic reference modeling']
      },
      {
        title: 'Journal & Ledger Architecture in Excel',
        topics: ['Entry validation grids', 'Automatic Chart of Accounts mapping', 'Dynamic T-Account calculation models']
      },
      {
        title: 'Trial Balance & Financial Statements',
        topics: ['Dynamic Trial Balance generation', 'P&L reporting templates', 'Automated Balance Sheet with sanity checks']
      },
      {
        title: 'Management Reports & Automation',
        topics: ['Monthly variance analysis models', 'Accounts receivable aging schedules', 'Executive summary dashboard design']
      }
    ]
  },
  {
    id: 'quickbooks-online-practical',
    title: 'QuickBooks Online Practical',
    tagline: 'Real-world business bookkeeping and cloud accounting in Intuit QuickBooks',
    level: 'Cloud Accounting',
    duration: '5 to 6 Weeks',
    tools: ['QuickBooks Online', 'Bank Feeds', 'Invoicing Engine', 'QBO Financial Reporting'],
    overview:
      'Train on the world’s most widely used small-and-medium enterprise cloud accounting platform. You will build a live practice company, configure the chart of accounts, record sales and expense cycles, reconcile real bank feeds, and produce audit-ready financial statements.',
    whatYouWillLearn: [
      'Complete company setup and preferences configuration',
      'Designing and customizing the Chart of Accounts',
      'Customer database management, estimates, and sales invoices',
      'Vendor records, purchase orders, and bill management',
      'Managing Accounts Receivable (A/R) and applying customer payments',
      'Managing Accounts Payable (A/P) and recording bill payments',
      'Connecting and categorizing live bank feed transactions',
      'Executing month-end Bank Reconciliation with zero discrepancies',
      'Generating, analyzing, and exporting management and financial reports'
    ],
    practicalSkills: [
      'Process full order-to-cash and procure-to-pay business cycles',
      'Perform monthly bank and credit card reconciliations',
      'Correct common bookkeeping mistakes and reclassify entries',
      'Generate customized Profit & Loss and Balance Sheet for management'
    ],
    keyModules: [
      {
        title: 'Company Setup & Chart of Accounts',
        topics: ['Company profile & tax settings', 'Sub-accounts hierarchy', 'Opening balances and historical data input']
      },
      {
        title: 'Sales & Accounts Receivable (A/R)',
        topics: ['Product & service catalog creation', 'Sales invoices & credit memos', 'Receiving payments and bank deposits']
      },
      {
        title: 'Expenses & Accounts Payable (A/P)',
        topics: ['Vendor bills and cash expenses', 'Paying bills via check and bank transfer', '1099/vendor expense reporting']
      },
      {
        title: 'Banking & Month-End Close',
        topics: ['Bank feed rules and matching', 'Bank statement reconciliation', 'Month-end closing lock & management reporting']
      }
    ]
  },
  {
    id: 'xero-accounting-practical',
    title: 'Xero Accounting Practical',
    tagline: 'Hands-on workflow training on the modern global cloud accounting powerhouse',
    level: 'Cloud Accounting',
    duration: '5 to 6 Weeks',
    tools: ['Xero Cloud Accounting', 'Bank Feeds', 'Xero Invoicing', 'Financial Reporting'],
    overview:
      'Master Xero, the cloud accounting software favored by international businesses and modern accounting practices. Learn organization setup, seamless bank statement reconciliation, sales invoicing, bills processing, and executive reporting.',
    whatYouWillLearn: [
      'Organization setup, financial settings, and currency configurations',
      'Chart of Accounts structure and customized account codes',
      'Managing Contacts (Customers and Suppliers)',
      'Creating professional Sales Invoices, credit notes, and quotes',
      'Entering Bills, purchase orders, and recording payments',
      'Handling live Bank transactions and automated bank rule creation',
      'One-click interactive Bank Reconciliation matching',
      'Managing Accounts Receivable and Accounts Payable aging',
      'Generating Xero executive summaries, P&L, and Balance Sheet reports'
    ],
    practicalSkills: [
      'Build recurring automated invoicing schedules',
      'Resolve complex bank feed unmatched items',
      'Track project-level profitability using tracking categories',
      'Generate multi-currency reporting and debtor follow-up statements'
    ],
    keyModules: [
      {
        title: 'Organization Setup & Chart of Accounts',
        topics: ['Financial settings & tax rates', 'Account type definitions', 'Opening balances ledger input']
      },
      {
        title: 'Sales & Customer Workflows',
        topics: ['Online invoice templates', 'Credit notes and prepayment allocation', 'Statement generation & collections']
      },
      {
        title: 'Purchases & Bills Management',
        topics: ['Drafting and approving bills', 'Scheduling supplier batch payments', 'Expense claims management']
      },
      {
        title: 'Banking, Reconciliation & Reporting',
        topics: ['Bank rule optimization', 'Reconciling line items with zero variance', 'Publishing final financial statements']
      }
    ]
  },
  {
    id: 'zoho-books-practical',
    title: 'Zoho Books Practical',
    tagline: 'End-to-end accounting training for fast-growing businesses and international clients',
    level: 'Cloud Accounting',
    duration: '4 to 5 Weeks',
    tools: ['Zoho Books', 'Banking Module', 'GST/VAT Rules', 'Zoho Reports'],
    overview:
      'Zoho Books is one of the fastest growing global accounting applications. This practical program covers complete organization onboarding, customer invoicing, supplier bills, banking automation, inventory items, and comprehensive financial reporting.',
    whatYouWillLearn: [
      'Organization setup and fiscal year preferences configuration',
      'Customizing the Chart of Accounts for service and retail businesses',
      'Managing Customer profiles, price lists, and payment terms',
      'Managing Vendor relationships, purchase orders, and bills',
      'Creating recurring invoices and automated payment reminders',
      'Recording business expenses and mileage tracking',
      'Banking integration, feeds import, and statement categorization',
      'Bank reconciliation workflow with matched transactions',
      'Extracting standard financial reports (P&L, Balance Sheet, Cash Flow)'
    ],
    practicalSkills: [
      'Manage item catalogs with purchase and sales rates',
      'Handle advances, credits, and customer refunds',
      'Reconcile business bank accounts accurately',
      'Generate audit-compliant general ledger extracts'
    ],
    keyModules: [
      {
        title: 'Organization Setup & Account Architecture',
        topics: ['Tax preferences & currencies', 'Chart of accounts customization', 'Opening balance verification']
      },
      {
        title: 'Invoicing & Receivables Cycle',
        topics: ['Sales orders and invoices', 'Retainers and customer advance payments', 'Overdue debt management']
      },
      {
        title: 'Purchases, Bills & Expenses',
        topics: ['Vendor bills recording', 'Expense receipt attachments', 'Vendor credits and refunds']
      },
      {
        title: 'Banking & Financial Reporting',
        topics: ['Bank feeds categorization', 'Reconciliation discrepancies resolution', 'Financial statements export']
      }
    ]
  },
  {
    id: 'complete-practical-accounting',
    title: 'Complete Practical Accounting',
    tagline: 'The all-in-one flagship career program combining Fundamentals, Excel, QBO, Xero & Zoho Books',
    level: 'Comprehensive Flagship',
    duration: '12 to 16 Weeks',
    tools: ['Excel Accounting', 'QuickBooks Online', 'Xero', 'Zoho Books', 'General Ledger'],
    overview:
      'Our most comprehensive and sought-after training program. We combine core accounting theory, practical double-entry mechanics, advanced Excel accounting modeling, and hands-on operational training across QuickBooks Online, Xero, and Zoho Books. You graduate ready for real accounting and bookkeeping roles.',
    whatYouWillLearn: [
      'Solid mastery of Accounting Fundamentals (Debit/Credit, Journals, Ledgers, Trial Balance, P&L, Balance Sheet)',
      'Practical Excel accounting worksheets, formulas, dynamic models, and automated reporting',
      'Full cycle bookkeeping in QuickBooks Online (Setup, Invoices, Bills, Banking, Reconciliations)',
      'Complete workflow execution in Xero (Contacts, Sales, Bills, Banking rules, Financials)',
      'Comprehensive administration in Zoho Books (Customers, Vendors, Expenses, Bank feeds)',
      'Cross-software comparison: how to transition workflows seamlessly between platforms',
      'Real-world business case simulations from raw receipts to final audit-ready financial statements'
    ],
    practicalSkills: [
      'Process 250+ real multi-cycle business transactions',
      'Maintain books simultaneously on Excel and cloud software',
      'Perform monthly end-to-end closing for service & trading businesses',
      'Prepare comparative financial statements and executive management packs'
    ],
    keyModules: [
      {
        title: 'Phase 1: Accounting Foundations & Double-Entry',
        topics: ['Principles & transaction analysis', 'General journal & T-Accounts', 'Trial balance & adjusting entries', 'P&L and Balance Sheet drafting']
      },
      {
        title: 'Phase 2: Excel Accounting & Financial Modeling',
        topics: ['Spreadsheet architecture', 'Formulas: SUMIFS, XLOOKUP, INDEX/MATCH', 'Automated ledger & dynamic Trial Balance', 'Financial statement modeling']
      },
      {
        title: 'Phase 3: QuickBooks Online Mastery',
        topics: ['Live company setup', 'Sales & A/R cycle', 'Purchases & A/P cycle', 'Bank feed rules & monthly reconciliation']
      },
      {
        title: 'Phase 4: Xero & Zoho Books Cloud Systems',
        topics: ['Xero setup, invoicing & reconciliation', 'Zoho Books workflow & expenses', 'Cross-platform transition techniques', 'Comprehensive capstone simulation']
      }
    ],
    popular: true
  }
];
