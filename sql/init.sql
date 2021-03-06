CREATE TABLE `order` (
  `id` varchar(36) NOT NULL,
  `status` varchar(10) NOT NULL,
  `distance` int(11) NOT NULL,
  `version` int(11) NOT NULL,
  `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `order_delivery`.`order` (id,status,distance,version,createdDate,updatedDate) VALUES 
('3ffc6389-a7b0-4f08-a7c2-56100592f630','UNASSIGNED',100,0,'2020-08-13 03:43:44.801256000','2020-08-13 06:23:15.185280000')
,('46616236-e11c-4e9d-9aba-dff66b720c2c','UNASSIGNED',100,3,'2020-08-13 05:58:05.755285000','2020-08-14 00:51:23')
,('6700a1a6-661a-4352-ac50-2575595f079a','UNASSIGNED',100,0,'2020-08-13 03:43:44.801256000','2020-08-13 06:23:15.185280000')
,('7e0f39f4-74d2-4a4e-b934-cfbc379f5578','UNASSIGNED',100,0,'2020-08-13 03:43:44.801256000','2020-08-13 06:23:15.185280000')
,('c22a7249-f252-4dee-9cbc-735bac0f79b2','UNASSIGNED',100,26,'2020-08-13 03:43:44.801256000','2020-08-13 06:23:15.185280000');