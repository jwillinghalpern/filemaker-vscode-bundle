# Change Log

## [1.10.0] - 2026-09-07

- Add missing functions and Get parameters from the current Claris functions reference, in both syntax highlighting and snippets:
  - AI/embedding functions: `AddEmbeddings`, `CosineSimilarity`, `GetEmbedding`, `GetEmbeddingAsFile`, `GetEmbeddingAsText`, `GetRAGSpaceInfo`, `GetTokenCount`, `NormalizeEmbedding`, `PredictFromModel`, `SubtractEmbeddings`, `GetTableDDL`, `GetFieldsOnLayout`
  - JSON functions: `JSONMakeArray`, `JSONParse`, `JSONParsedState`
  - Design functions: `BaseTableComment`, `BaseTableIDs`, `BaseTableNames`, `FieldAnnotation`, `FieldDisplayNames`, `GetBaseTableName`
  - Others: `ExecuteSQLe`, `GetLiveTextAsJSON`, `GetPersistentData`, `ListPersistentDataIDs`, `GetRecordIDsFromFoundSet`, `GetTextFromPDF`
  - Get parameters: `AccountPasswordDaysRemaining`, `CacheFileName`, `CacheFilePath`, `CurrentTimeUTCMicroseconds`, `GuidedAccessState`, `LastErrorDetail`, `LastErrorLocation`, `LastStepTokensUsed`, `RevertTransactionOnErrorState`, `SystemStorageAvailable`, `TransactionOpenState`, `WindowUUID`
- Automate releases with GitHub Actions: publish to the VS Code Marketplace and Open VSX on tag push.
- Inline the `fm-json-to-jsonsetelement` dependency into the extension source. No behavior change; the extension now has no runtime dependencies, and its conversion logic is covered by tests in this repo.

## [1.8.0] - 2022-07-06

- Add `FileMaker: JSON to JSONSetElement()` command to convert json text to a FileMaker expression. Search in the VSCode Command Palette.

## [1.1.0] - 2020-07-03

- add fm 19 functions and get params

## [1.0.1] - 2019-12-19

- add logo by Carson Lind
- fix cfheader
- Improve readme

## [1.0.0] - 2019-12-18

- initial release on the VSCode extension marketplace

## [0.0.3] - 2019-05-28

**added:**

- FileMaker 18 functions
  - While, SetRecursion, CryptGenerateSignature, CryptVerifySignature, Get ( AccountType ), and Get ( OpenDataFieldType )
- Changed pcount prefix to patternc

## [0.0.2] - 2019-02-24

**added:**

- Get(_flag_) expansions
- Case, Let, Esql options
  - thanks @rivetopia for all the above

## [0.0.1] - 2019-01-13

- Initial release
- added
  - JSON
- modifieds
  - let and calc
