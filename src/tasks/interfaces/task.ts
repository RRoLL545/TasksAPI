/**
 * Тип данных для поиска задач по массиву идентификаторов задач
 */
type TTaskColumnIds = {
  id: number[];
}

/**
 * Тип данных для поиска задач по идентификатору ответственного
 */
type TTaskColumnResponsibleId = {
  responsible_id: number;
}

/**
 * Тип данных для поиска задач по идентификатору статуса
 */
type TTaskColumnStatusId = {
  status_id: number;
}

/**
 * Тип данных для поиска задач по колонке с идентификатором
 */
export type TTaskColumn = TTaskColumnIds
  | TTaskColumnResponsibleId
  | TTaskColumnStatusId;