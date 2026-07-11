import { supabase } from "../lib/supabase";

export async function getTransactions(userId, year) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .eq("year", year)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createTransaction(values) {
  const { data, error } = await supabase
    .from("transactions")
    .insert(values)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function editTransaction(transactionId, values) {
  const { data, error } = await supabase
    .from("transactions")
    .update(values)
    .eq("id", transactionId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function removeTransaction(transactionId) {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId);

  if (error) {
    throw error;
  }
}
