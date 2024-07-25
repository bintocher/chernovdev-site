---
keywords: [удалить лицензию qlik sense, лицензия]
tags: ['license','slk','lef','qlik sense']
---

# Удаление лицензий из Qlik Sense Enterprise

Способ работает для LEF и SLK активаций

1. Получаем доступ в БД Qlik
2. Выполняем команду
```sql
DELETE FROM "QSR".public."Licenses";
```
3. Перезапускаем службу Qlik Sense Repoitory (она в свою очередь перезапустит остальные службы)
4. Открываем QMC - вводим новую лицензию
