import { supabase } from "../lib/supabase";

export async function getAccounts(userId) {
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data ?? [];
}

export async function createAccount(account) {
  const { data, error } = await supabase
    .from("accounts")
    .insert(account)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateAccount(id, values) {
  const { data, error } = await supabase
    .from("accounts")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteAccount(id) {
  const { error } = await supabase.from("accounts").delete().eq("id", id);

  if (error) throw error;
}
