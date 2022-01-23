import { useEffect, useState } from "react";
import BankApi from "./api/BankApi";
import "./App.css";
import Account from "./components/Account";

function App() {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await BankApi.get("/accounts");
        setAccounts(response.data.accounts);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {loading && <div>Loading</div>}
      {!loading && (
        <div>
          <h2>Bank Accounts</h2>
          {accounts.map((account) => (
            <Account
              key={account.passportid}
              passportid={account.passportid}
              cash={account.cash}
              credit={account.credit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
