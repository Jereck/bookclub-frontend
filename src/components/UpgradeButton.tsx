import { useState } from "react";
import { apiRequest } from "@/utils/api";

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    try {
      await apiRequest("/user/subscription", {
        method: "PUT",
        body: JSON.stringify({ newTier: "premium" }),
      });
      alert("Subscription upgraded!");
    } catch (error) {
      console.error(error);
      alert("Upgrade failed.");
    }
    setLoading(false);
  }

  return (
    <button onClick={handleUpgrade} disabled={loading}>
      {loading ? "Upgrading..." : "Upgrade to Premium"}
    </button>
  );
}
