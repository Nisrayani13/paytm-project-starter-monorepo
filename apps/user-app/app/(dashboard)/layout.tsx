import SidebarItem from "../../components/SidebarItem";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex gap-x-4">
      {/* Left */}
      <div className="w-full max-w-[33.33%] lg:w-56 flex justify-start items-start border-r border-slate-300 px-4 pt-10">
        <div className="flex flex-col gap-y-5">
          <SidebarItem renderIcon={<HomeIcon></HomeIcon>} text="Home" href="/dashboard"></SidebarItem>
          <SidebarItem renderIcon={<TransferIcon></TransferIcon>} text="Transfer" href="/transfer"></SidebarItem>
          <SidebarItem renderIcon={<TransactionsIcon></TransactionsIcon>} text="Transactions" href="/transactions"></SidebarItem>
        </div>
      </div>

      {/* Right */}
      <div className="w-full">{children}</div>
    </div>
  );
}

function HomeIcon() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        className="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    </div>
  );
}

function TransferIcon() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        className="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
    </div>
  );
}

function TransactionsIcon() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        className="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
  );
}
