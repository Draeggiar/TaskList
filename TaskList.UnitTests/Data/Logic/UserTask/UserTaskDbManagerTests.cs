using System;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using TaskList.Data;
using TaskList.Data.Enums;
using TaskList.Data.Logic.UserTask;
using TaskList.Data.Models;
using TaskList.Data.Models.DbEntities;
using TaskList.Data.Models.ViewModels;

namespace TaskList.UnitTests.Data.Logic.UserTask
{
    [TestFixture]
    public class UserTaskDbManagerTests
    {
        private IMapper _mapper;

        [SetUp]
        public void Init()
        {
            _mapper = new MapperConfiguration(cfg => { cfg.AddProfile(new MappingProfile()); }).CreateMapper();
        }

        [Test]
        public void Create_ShouldAdd_NewEntityToDb()
        {
            var expected = new UserTaskEntity
            {
                Name = "TestTask1",
                Deadline = "01.02.2003 00:00:00",
                TaskStatus = 0,
                UserId = 1,
            };
            var options = new DbContextOptionsBuilder<TasksDbContext>()
                .UseInMemoryDatabase(databaseName: "Create_test")
                .Options;

            using (var context = new TasksDbContext(options))
            {
                var tasksManager = new UserTaskDbManager(context, _mapper);
                tasksManager.Create(new UserTaskDetailsViewModel
                {
                    Name = "TestTask1",
                    Deadline = new DateTime(2003, 02, 01),
                    TaskStatus = TaskStatus.New,
                    UserId = 1
                });
            }

            using (var context = new TasksDbContext(options))
            {
                Assert.AreEqual(1, context.UserTasks.Count());
                var taskFromDb = context.UserTasks.First();
                Assert.AreEqual(expected.Name, taskFromDb.Name);
                Assert.AreEqual(expected.Deadline, taskFromDb.Deadline);
                Assert.AreEqual(expected.TaskStatus, taskFromDb.TaskStatus);
                Assert.AreEqual(expected.UserId, taskFromDb.UserId);
            }
        }
    }
}