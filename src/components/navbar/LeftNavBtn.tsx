import { sidebarOpen, toggleSidebar } from "@/stores/sidebarSignal";

interface LeftNavBtnProps {
  clickCallback?: (state: boolean) => void;
  atTop?: () => boolean;
}

function LeftNavBtn(props: LeftNavBtnProps) {
  const atTop = () => props.atTop?.() ?? true;
  const handleToggle = () => {
    toggleSidebar();
    props.clickCallback?.(sidebarOpen());
  };

  return (
    <button
      class="left-nav-btn border-none bg-transparent flex flex-col cursor-pointer items-center justify-center lg:hidden"
      onclick={handleToggle}
      aria-label="Toggle sidebar"
      type="button"
    >
      <div class="line-height-0 p-5 w-5.5 box-unset">
        <div
          class={`line-menu ${sidebarOpen() ? "line-1" : ""} ${atTop() ? "line-top" : "line-bg"}`}
        ></div>
        <div
          class={`line-menu mt-0.75 ${sidebarOpen() ? "line-2" : ""} ${atTop() ? "line-top" : "line-bg"}`}
        ></div>
        <div
          class={`line-menu mt-0.75 ${sidebarOpen() ? "line-3" : ""} ${atTop() ? "line-top" : "line-bg"}`}
        ></div>
      </div>
    </button>
  );
}

export default LeftNavBtn;
