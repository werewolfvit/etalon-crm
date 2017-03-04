/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/


/*--- Роли пользователей ---*/
insert into Roles (Name, [Description])
select Name, [description]
from 
	(
	select 'admin' as name, 'Администратор' as [description] union ALL
	select 'employer', 'Сотрудник'  union ALL
	select 'renter', 'Арендатор' 
	) as data
where name not in (select name from roles) 
/*--------------------------*/


/*--- Учетная запись администратора ---*/
insert into Users (UserId,	UserName,	PasswordHash,	SecurityStamp,	IsActive,	Email)
select *
from 
(
select 
'00000000-0000-0000-0000-000000000000' as UserId,	
'admin' as name,	
'AA3FuQlMnGQsDGgLKDAPmOw/W15vkrO5LeHrevGjJpNpucvQJiayz7qBFANzSCL22g==' as PasswordHash,	
'91580cc6-7071-4f4b-a0ff-e103ff361ea3' as SecurityStamp,	
1 as IsActive,	
'admin@etalon.ru' as Email	
) as data 
where name not in (select userName from users)
/*-------------------------------------*/


/*------- Группы пользователей -------*/
insert into MsgGroups(Name)
select Name
from 
	(
	select 'Арендаторы' as name union ALL
	select 'Бухгатерия' union ALL
	select 'Охрана' 
	) as data
where name not in (select name from MsgGroups) 
/*---------------------------------*/

/*------- Компании -------*/
SET IDENTITY_INSERT Companies ON;
insert into Companies(IdRecord, Name)
select IdRecord, Name
from 
	(
	select 0 as IdRecord, '-' as Name
	) as data
where IdRecord not in (select IdRecord from Companies) 
SET IDENTITY_INSERT Companies OFF;
/*---------------------------------*/