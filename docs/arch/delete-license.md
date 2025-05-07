---
keywords: [удалить лицензию qlik sense, лицензия]
tags: ['license','slk','lef','qlik sense']
description: "Инструкция по полному удалению лицензий (LEF, SLK) из Qlik Sense Enterprise. SQL-скрипты и шаги для очистки информации о лицензиях из базы данных Qlik."
---

# Удаление лицензий из Qlik Sense Enterprise

Способ работает для LEF и SLK активаций

1. Получаем доступ в БД Qlik
2. Выполняем команды в 2 базах данных `Licenses` и `QSR`:
```sql
DELETE FROM "Licenses".public.licenses_allotment_index;
DELETE FROM "Licenses".public.licenses_assignment_base;
DELETE FROM "Licenses".public.licenses_assignments;
DELETE FROM "Licenses".public.licenses_consumption;
DELETE FROM "Licenses".public.licenses_identities;
DELETE FROM "Licenses".public.licenses_licenses;
DELETE FROM "Licenses".public.licenses_sync_metadata;
DELETE FROM "Licenses".public.licenses_tenants;
DELETE FROM "QSR".public."LicenseAnalyzerAccessGroups";
DELETE FROM "QSR".public."LicenseAnalyzerAccessTypes";
DELETE FROM "QSR".public."LicenseAnalyzerAccessUsages";
DELETE FROM "QSR".public."LicenseAnalyzerTimeAccessTypes";
DELETE FROM "QSR".public."LicenseAnalyzerTimeAccessUsages";
DELETE FROM "QSR".public."LicenseAnalyzerTimeAccessUsageSessions";
DELETE FROM "QSR".public."LicenseLoginAccessTypes";
DELETE FROM "QSR".public."LicenseLoginAccessUsages";
DELETE FROM "QSR".public."LicenseLoginAccessUsageSessions";
DELETE FROM "QSR".public."LicenseProfessionalAccessGroups";
DELETE FROM "QSR".public."LicenseProfessionalAccessTypes";
DELETE FROM "QSR".public."LicenseProfessionalAccessUsages";
DELETE FROM "QSR".public."Licenses";
DELETE FROM "QSR".public."LicenseUserAccessGroups";
DELETE FROM "QSR".public."LicenseUserAccessTypes";
DELETE FROM "QSR".public."LicenseUserAccessUsages";
```
3. Перезапускаем службу Qlik Sense Repoitory (она в свою очередь перезапустит остальные службы)
4. Открываем QMC - вводим новую лицензию
