Folder structure for Nextjs

app/
├── \_components/ # Global reusable components
│ ├── ui/
│ │ ├── button.tsx
│ │ ├── input.tsx
│ │ └── card.tsx
│ └── layout/
│ ├── Header.tsx
│ └── Footer.tsx
├── create-new-trip/
│ ├── \_components/ # Page-specific components
│ │ ├── ChatBox.tsx
│ │ ├── GroupSizeUi.tsx
│ │ └── BudgetUi.tsx
│ └── page.tsx
├── dashboard/
│ ├── \_components/ # Dashboard-specific components
│ │ ├── StatsCard.tsx
│ │ └── UserProfile.tsx
│ └── page.tsx
