export const user = {
  name: "Janam",
  fullName: "Janam Shah",
  initials: "JS",
};

export const account = {
  type: "Savings Account",
  number: "XXXXXXXX8033",
  lastFour: "8033",
  balance: 135991.21,
  interestRate: 2.5,
  bank: "SBI",
};

export const debitCard = {
  number: "XXXX XXXX XXXX 4957",
  lastFour: "4957",
  holder: "JANAM SHAH",
  validFrom: "05/21",
  expiry: "04/26",
  network: "VISA",
};

export const payees = [
  {
    id: "1",
    name: "Janam Shah",
    initials: "JS",
    bank: "Kotak Mahindra",
    accountLastFour: "5871",
    color: "bg-blue-100 text-blue-700",
    lastPaidAmount: 34000,
    lastPaidDate: "30 Mar",
  },
  {
    id: "2",
    name: "Manali Bhavsar",
    initials: "MB",
    bank: "SBI",
    accountLastFour: "5325",
    color: "bg-pink-100 text-pink-700",
    lastPaidAmount: 5200,
    lastPaidDate: "25 Mar",
  },
  {
    id: "3",
    name: "Rahul Sharma",
    initials: "RS",
    bank: "HDFC",
    accountLastFour: "9012",
    color: "bg-green-100 text-green-700",
    lastPaidAmount: 2000,
    lastPaidDate: "15 Mar",
  },
];

export const transactions = [
  {
    id: "1",
    name: "Janam Shah",
    date: "30 Mar",
    mode: "IMPS",
    amount: -34000,
    type: "sent" as const,
  },
  {
    id: "2",
    name: "Salary Credit",
    date: "28 Mar",
    mode: "NEFT",
    amount: 85000,
    type: "received" as const,
  },
  {
    id: "3",
    name: "Manali Bhavsar",
    date: "25 Mar",
    mode: "IMPS",
    amount: -5200,
    type: "sent" as const,
  },
];

export const schemes = [
  {
    id: "1",
    icon: "🎓",
    title: "Education Loan",
    description: "Study anywhere in India or abroad. Starting at 8.15% p.a.",
    bgColor: "bg-blue-50",
  },
  {
    id: "2",
    icon: "🏪",
    title: "MSME Easy Loan",
    description: "Grow your small business. Collateral-free up to ₹1 Cr.",
    bgColor: "bg-green-50",
  },
  {
    id: "3",
    icon: "🏠",
    title: "PM Awas Yojana",
    description: "Home loan subsidy up to ₹2.67 lakh for eligible families.",
    bgColor: "bg-yellow-50",
  },
  {
    id: "4",
    icon: "🚜",
    title: "Kisan Credit Card",
    description: "Crop loans at 4% p.a. with interest subvention for farmers.",
    bgColor: "bg-pink-50",
  },
  {
    id: "5",
    icon: "🚀",
    title: "Startup India Loan",
    description: "Fund your startup dream. Special rates for DPIIT registered startups.",
    bgColor: "bg-blue-50",
  },
];

export const upcomingPayments = [
  { name: "Electricity Bill", due: "15 Apr", amount: 2450, urgent: true },
  { name: "Credit Card", due: "20 Apr", amount: 12800, urgent: false },
];

export const quickServices = [
  { icon: "📜", label: "Statements" },
  { icon: "📝", label: "Cheque Book" },
  { icon: "🏧", label: "ATM Locator" },
  { icon: "📋", label: "Tax Payment" },
  { icon: "🏦", label: "Fixed Deposit" },
  { icon: "📈", label: "Investments" },
  { icon: "🛡️", label: "Insurance" },
  { icon: "📞", label: "Help & Support" },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));
}
