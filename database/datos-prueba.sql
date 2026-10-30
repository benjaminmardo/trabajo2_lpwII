USE inventario_tecnologico;

INSERT INTO equipos
  (codigoInventario, nombre, tipo, marca, modelo, ubicacion, estado, fechaAdquisicion, observaciones)
VALUES
  ('INV-001', 'Notebook laboratorio', 'Notebook', 'Lenovo', 'ThinkPad E14', 'Laboratorio 1', 'Disponible', '2023-03-15', 'Equipo para actividades de programación'),
  ('INV-002', 'PC diseño', 'PC', 'Dell', 'OptiPlex 7090', 'Sala de diseño', 'En uso', '2022-08-10', 'Asignado al equipo de diseño'),
  ('INV-003', 'Monitor sala 2', 'Monitor', 'Samsung', 'S24R350', 'Sala 2', 'Disponible', '2021-11-05', NULL),
  ('INV-004', 'Proyector auditorio', 'Proyector', 'Epson', 'PowerLite X49', 'Auditorio', 'Mantención', '2020-06-22', 'Revisión de lámpara pendiente'),
  ('INV-005', 'Notebook administración', 'Notebook', 'HP', 'ProBook 450', 'Oficina de administración', 'Baja', '2019-02-18', 'Equipo dado de baja por antigüedad');
