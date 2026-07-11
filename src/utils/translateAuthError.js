function translateAuthError(message) {
  const normalizedMessage = message?.toLowerCase() ?? "";

  if (normalizedMessage.includes("invalid login credentials")) {
    return "E-mail ou senha inválidos.";
  }

  if (normalizedMessage.includes("email not confirmed")) {
    return "Confirme seu e-mail antes de entrar.";
  }

  if (normalizedMessage.includes("user already registered")) {
    return "Já existe uma conta cadastrada com este e-mail.";
  }

  if (normalizedMessage.includes("password should be at least")) {
    return "A senha deve possuir pelo menos 6 caracteres.";
  }

  if (normalizedMessage.includes("invalid email")) {
    return "Digite um endereço de e-mail válido.";
  }

  if (normalizedMessage.includes("email rate limit exceeded")) {
    return "Muitas tentativas. Aguarde alguns minutos.";
  }

  if (normalizedMessage.includes("signup is disabled")) {
    return "O cadastro de novas contas está desativado.";
  }

  return "Ocorreu um erro. Tente novamente.";
}

export default translateAuthError;
