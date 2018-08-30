USE [heroesDb]
GO
SET IDENTITY_INSERT [dbo].[Owners] ON 
GO
INSERT [dbo].[Owners] ([Id], [Owner]) VALUES (1, N'DCComics')
GO
INSERT [dbo].[Owners] ([Id], [Owner]) VALUES (2, N'Marvel')
GO
INSERT [dbo].[Owners] ([Id], [Owner]) VALUES (3, N'Disney')
GO
INSERT [dbo].[Owners] ([Id], [Owner]) VALUES (4, N'DCComics2')
GO
INSERT [dbo].[Owners] ([Id], [Owner]) VALUES (5, N'DCComics3')
GO
SET IDENTITY_INSERT [dbo].[Owners] OFF
GO
SET IDENTITY_INSERT [dbo].[Heroes] ON 
GO
INSERT [dbo].[Heroes] ([Id], [Name], [OwnerId]) VALUES (3, N'Batman', 1)
GO
INSERT [dbo].[Heroes] ([Id], [Name], [OwnerId]) VALUES (4, N'Superman', 2)
GO
INSERT [dbo].[Heroes] ([Id], [Name], [OwnerId]) VALUES (5, N'Wolverine', 1)
GO
INSERT [dbo].[Heroes] ([Id], [Name], [OwnerId]) VALUES (6, N'WonderWoman', 3)
GO
INSERT [dbo].[Heroes] ([Id], [Name], [OwnerId]) VALUES (7, N'Atlasin', 1)
GO
INSERT [dbo].[Heroes] ([Id], [Name], [OwnerId]) VALUES (8, N'Batman2', 1)
GO
INSERT [dbo].[Heroes] ([Id], [Name], [OwnerId]) VALUES (9, N'Batman4', 5)
GO
SET IDENTITY_INSERT [dbo].[Heroes] OFF
GO
