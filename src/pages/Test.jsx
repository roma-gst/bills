import { useEffect } from "react";
import { supabase } from "../lib/supabase";

function Test() {
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase.from("transactions").select("*");

      console.log(data);
      console.log(error);
    }

    test();
  }, []);

  return <h1>Testando Supabase...</h1>;
}

export default Test;
