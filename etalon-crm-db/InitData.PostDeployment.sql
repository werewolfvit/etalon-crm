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
insert into Roles (Name)
select Name
from 
	(select 'admin' as name union ALL
	select 'employer' union ALL
	select 'renter' ) as data
where name not in (select name from roles) 
/*--------------------------*/


/*--- Admin ---*/
insert into Users (UserId,	UserName,	PasswordHash,	SecurityStamp,	IsActive,	Email)
select *
from (
select '00000000-0000-0000-0000-000000000000' as UserId,	
'admin' as name,	
'AA3FuQlMnGQsDGgLKDAPmOw/W15vkrO5LeHrevGjJpNpucvQJiayz7qBFANzSCL22g==' as PasswordHash,	
'91580cc6-7071-4f4b-a0ff-e103ff361ea3' as SecurityStamp,	1 as IsActive,	
'admin@etalon.ru' as Email	
) as data 
where name not in (select userName from users)
/*--------------------------*/