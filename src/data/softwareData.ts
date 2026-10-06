import { SoftwareDetail } from '../types';

export const SOFTWARE_DATA: SoftwareDetail[] = [
  {
    id: 'excel',
    name: 'Microsoft Excel',
    badge: 'Universal Spreadsheet Standard',
    tagline: 'Custom accounting models, dynamic general ledgers, and automated reporting',
    description:
      'Excel is the universal analytical canvas of finance professionals worldwide. At Veer Accountancy, students do not just look at completed templates—they build comprehensive, automated 12-column accounting workbooks, write robust formulas, and construct live financial statements from raw transactional data.',
    accentColor: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    practicalWorkflow: [
      {
        stage: '01. Template Architecture',
        action: 'Design standardized input grids with date pickers, account dropdown validation, and reference keys.',
        deliverable: 'Clean, auditable data input structure preventing manual input errors.'
      },
      {
        stage: '02. Dynamic Formula Linking',
        action: 'Deploy SUMIFS, XLOOKUP, and IF statements to aggregate debits and credits by account code automatically.',
        deliverable: 'Self-updating General Ledger where manual posting errors are eliminated.'
      },
      {
        stage: '03. Trial Balance Automation',
        action: 'Extract ending balances into debit/credit columns with real-time balance condition checks.',
        deliverable: 'Dynamic Trial Balance that highlights any variance immediately.'
      },
      {
        stage: '04. Financial Statement Generation',
        action: 'Link Trial Balance balances into formal Income Statement and Balance Sheet structures.',
        deliverable: 'Automated executive financial reporting pack with variance charts.'
      }
    ],
    coreFeatures: [
      'Advanced financial lookup functions: XLOOKUP, INDEX/MATCH, VLOOKUP',
      'Conditional aggregation formulas: SUMIFS, COUNTIFS, AVERAGEIFS',
      'Data Validation lists, drop-down controls, and error alert triggers',
      'Automated dynamic Trial Balance with automatic debit/credit verification',
      'PivotTables and PivotCharts for expense breakdowns and sales trends',
      'Automated Balance Sheet models with built-in balancing validation checks'
    ],
    practicalExercises: [
      'Build a complete 12-column accounting worksheet for a trading firm from scratch',
      'Create an automated Accounts Receivable aging schedule with dynamic overdue flags',
      'Develop a monthly payroll and tax deduction computation model in Excel',
      'Design an interactive departmental budget-versus-actual variance report'
    ]
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks Online (QBO)',
    badge: 'Global SME Market Leader',
    tagline: 'End-to-end cloud business bookkeeping, invoicing, and bank reconciliations',
    description:
      'QuickBooks Online is the industry standard cloud accounting platform adopted by millions of small and medium businesses across North America, Europe, the Middle East, and beyond. Students learn end-to-end operational bookkeeping in a live practice environment.',
    accentColor: 'from-green-500/20 to-emerald-500/10 border-green-500/30 text-green-400',
    practicalWorkflow: [
      {
        stage: '01. Company Onboarding',
        action: 'Set up business legal entity, sales tax preferences, accounting method (accrual/cash), and fiscal calendar.',
        deliverable: 'Configured company profile and customized Chart of Accounts hierarchy.'
      },
      {
        stage: '02. Sales & Revenue Cycle',
        action: 'Set up products and services catalog, generate customized customer invoices, record customer payments and bank deposits.',
        deliverable: 'Real-time Accounts Receivable tracking and collections schedule.'
      },
      {
        stage: '03. Bills & Expenses Cycle',
        action: 'Record vendor bills, capture receipts, track inventory purchases, and schedule payments by check or transfer.',
        deliverable: 'Organized Accounts Payable and accurate vendor balance records.'
      },
      {
        stage: '04. Bank Feeds & Reconciliation',
        action: 'Connect simulated bank feeds, configure automated bank classification rules, and execute zero-variance monthly reconciliations.',
        deliverable: 'Fully reconciled bank accounts and audit-ready monthly close.'
      }
    ],
    coreFeatures: [
      'Customized Chart of Accounts configuration and opening balance adjustments',
      'Comprehensive customer management, sales invoicing, estimates, and payment processing',
      'Vendor management, purchase orders, bill creation, and payables management',
      'Bank feed connectivity, transaction categorization, and intelligent bank matching rules',
      'Month-end Bank and Credit Card reconciliation workflows',
      'Automated generation of Profit & Loss, Balance Sheet, and Cash Flow Statements'
    ],
    practicalExercises: [
      'Configure a complete practice company from legal inception to operational readiness',
      'Process a full 30-day transactional cycle including invoices, bills, and credit memos',
      'Perform a comprehensive monthly bank reconciliation resolving uncleared items',
      'Prepare and customize management reports for executive presentation'
    ]
  },
  {
    id: 'xero',
    name: 'Xero Accounting',
    badge: 'Modern Global Cloud Suite',
    tagline: 'Intuitive international cloud accounting, bank rules, and executive reporting',
    description:
      'Xero is widely celebrated for its clean, beautiful interface, powerful automated bank rules, and global adoption among top international accounting firms. Students learn the full operational workflow of modern digital bookkeeping using Xero.',
    accentColor: 'from-sky-500/20 to-cyan-500/10 border-sky-500/30 text-sky-400',
    practicalWorkflow: [
      {
        stage: '01. Organization Architecture',
        action: 'Define organizational details, multi-currency settings, financial years, and customized account codes.',
        deliverable: 'Fully compliant operational ledger structure ready for transactional volume.'
      },
      {
        stage: '02. Invoicing & Contacts',
        action: 'Build smart customer records, dispatch electronic invoices with direct pay links, and configure payment reminders.',
        deliverable: 'Streamlined debtor collection workflow with automated reminders.'
      },
      {
        stage: '03. Bills & Spend Money',
        action: 'Approve vendor bills, record direct spend money transactions, and set up supplier payment batches.',
        deliverable: 'Accurate liability tracking and orderly disbursement controls.'
      },
      {
        stage: '04. Fast Bank Reconciliation',
        action: 'Match bank feed statements using Xero’s side-by-side reconciliation screen and create automated bank rules.',
        deliverable: 'Zero-discrepancy reconciliation with automated rule intelligence.'
      }
    ],
    coreFeatures: [
      'Organization setup, multi-currency support, and financial settings configuration',
      'Interactive side-by-side Bank Reconciliation with automated rule suggestions',
      'Sales invoicing engine with branded templates and automated recurring invoices',
      'Bills and Accounts Payable with approval workflows and scheduled payments',
      'Tracking categories for department and project-level profitability monitoring',
      'Publishable executive financial reports with annotations and audit schedules'
    ],
    practicalExercises: [
      'Establish a multi-currency service firm profile in Xero with customized tax codes',
      'Execute a 20-transaction bank feed reconciliation session with custom rule creation',
      'Set up recurring client invoices with automated late-payment reminders',
      'Produce an annotated Executive Financial Summary and publish closing reports'
    ]
  },
  {
    id: 'zohobooks',
    name: 'Zoho Books',
    badge: 'Fast-Growing Enterprise Suite',
    tagline: 'End-to-end automation, tax-ready compliance, and modern workflow management',
    description:
      'Zoho Books is renowned for its rapid global growth, deep automation capabilities, and cost-effective enterprise features. Our students gain practical competence in configuring Zoho Books, managing customer journeys, and running financial controls.',
    accentColor: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    practicalWorkflow: [
      {
        stage: '01. Business Setup & Taxes',
        action: 'Configure legal structure, currencies, default payment terms, and sales tax/GST configurations.',
        deliverable: 'A solid foundation tailored to regional and international business standards.'
      },
      {
        stage: '02. Customer & Invoicing Pipeline',
        action: 'Create customer estimates, convert to tax invoices upon approval, and record retainer advances.',
        deliverable: 'Seamless order-to-cash pipeline with transparent customer ledger records.'
      },
      {
        stage: '03. Vendor & Expense Controls',
        action: 'Record supplier bills, capture operational expenses with receipt proofs, and manage vendor credits.',
        deliverable: 'Disciplined expense governance and optimized accounts payable.'
      },
      {
        stage: '04. Banking & Live Close',
        action: 'Import bank statements, categorize feeds, match receipts to open balances, and close the period.',
        deliverable: 'Balanced accounts, audited trial balance, and reliable management dashboards.'
      }
    ],
    coreFeatures: [
      'Rapid organization setup, regional tax compliance, and Chart of Accounts customization',
      'Sales order to invoice conversion, retainer invoices, and automated payment gateways',
      'Vendor bills, expense tracking with receipt attachments, and recurring bills',
      'Automated banking feeds, transaction categorization, and bank statement matching',
      'Item inventory tracking with purchase and selling price management',
      'Real-time financial reporting: P&L, Balance Sheet, Cash Flow, and Ledger reports'
    ],
    practicalExercises: [
      'Configure a comprehensive Zoho Books organization for a distribution business',
      'Process sales orders into invoices and handle customer advance payments',
      'Record multi-item vendor bills and reconcile monthly vendor statements',
      'Extract comprehensive General Ledger and Trial Balance audit exports'
    ]
  }
];
