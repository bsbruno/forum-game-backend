        regex: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,

Explicando em mais detalhes:
(?=._[a-z]) - Ao menos uma letra minuscula
(?=._[A-Z]) - Ao menos uma letra maiuscula
(?=._[0-9]) - Ao menos um Número
(?=._[!@#$%^&*]) - Ao menos um caractere especial
$/
