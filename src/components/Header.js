import { useTheme } from "../context/ThemeContext";

function Header() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px 30px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <h1 style={{ margin: 0 }}>Mini Movie Manager</h1>

      <button
        onClick={toggleTheme}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
        }}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </header>
  );
}

export default Header;
