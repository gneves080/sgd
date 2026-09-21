# SGD

Simulador de Gastos Domésticos, construído com Next.js, TypeScript, Tailwind CSS, Recharts e Vitest.

## Executar localmente

No Windows, quando a política do PowerShell bloquear scripts, use `npm.cmd`:

```powershell
Set-Location 'c:\Users\Gabriel\Desktop\SGD'
npm.cmd install
npm.cmd run dev
```

Abra `http://localhost:3000`. A conta demo é `demo@sgd.com` com a senha `demo123`.

## CRUDCrud

Copie `.env.example` para `.env.local` e mantenha `CRUDCRUD_BASE_URL` apontando para o endpoint fornecido. As APIs tentam usar o CRUDCrud primeiro e usam o JSON em `data/db.json` como fallback local quando o endpoint não está configurado ou fica indisponível.

Recursos remotos: `users`, `incomes`, `expenses`, `envelopes`, `goals`, `futureExpenses` e `simulations`.

## Caminho de testes

1. Testes de lógica financeira:

```powershell
npm.cmd test
```

2. TypeScript e build de produção:

```powershell
npm.cmd run build
```

3. Lint:

```powershell
npm.cmd run lint
```

4. Teste manual autenticado:

- Acesse `/login` e entre com a conta demo.
- Abra `/receitas`, crie uma receita e confirme que ela aparece na lista.
- Abra `/despesas`, crie uma despesa e confirme o registro.
- Abra `/simulador`, crie um cenário e confirme o impacto.
- Volte ao `/dashboard` e confira os totais.
- Teste `/api/finance/envelopes`, `/api/finance/goals` e `/api/finance/futureExpenses` pelo navegador ou por uma ferramenta HTTP.

5. Teste de isolamento:

- Crie uma segunda conta em `/register`.
- Confirme que os dados criados pela conta demo não aparecem para o novo usuário.
- Remova temporariamente `CRUDCRUD_BASE_URL` do `.env.local`, reinicie o servidor e repita os fluxos para validar o fallback local.