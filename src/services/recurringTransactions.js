import { supabase } from "../lib/supabase";

export async function getRecurringTransactions(userId) {
  const { data, error } = await supabase
    .from("recurring_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createRecurringTransaction(values) {
  const { data, error } = await supabase
    .from("recurring_transactions")
    .insert(values)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateRecurringTransaction(id, values) {
  const { data, error } = await supabase
    .from("recurring_transactions")
    .update({
      ...values,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteRecurringTransaction(id) {
  const { error } = await supabase
    .from("recurring_transactions")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function generateRecurringTransactions(year) {
  const { data, error } = await supabase.rpc(
    "generate_recurring_transactions",
    {
      target_year: year,
    },
  );

  if (error) {
    throw error;
  }

  return Number(data ?? 0);
}

export async function removeFutureRecurringTransactions(ruleId) {
  const { data, error } = await supabase.rpc(
    "remove_future_recurring_transactions",
    {
      rule_id_input: ruleId,
    },
  );

  if (error) {
    throw error;
  }

  return Number(data ?? 0);
}
