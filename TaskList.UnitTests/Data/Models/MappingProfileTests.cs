using AutoMapper;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskList.Data.Enums;
using TaskList.Data.Models;
using TaskList.Data.Models.DbEntities;
using TaskList.Data.Models.ViewModels;

namespace TaskList.UnitTests.Data.Models
{
    [TestFixture]
    public class MappingProfileTests
    {
        private MapperConfiguration _mapperConfig;

        [OneTimeSetUp]
        public void Init()
        {
            _mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });
        }

        [Test]
        public void Mapper_ShouldHaveValidConfig()
        {
            _mapperConfig.AssertConfigurationIsValid();
        }

        [Test]
        public void Mapper_ShouldCorrectlyMap_UserTaskEntityToUserTaskViewModel()
        {
            var userTaskEntity = new UserTaskEntity
            {
                Deadline = "01.02.2003",
                Id = 1,
                Name = "TestTask",
                TaskStatus = 1,
                UserId = 1,
                GroupId = 1
            };
            var expected = new UserTaskDetailsViewModel
            {
                Deadline = new DateTime(2003, 2, 1),
                Id = 1,
                Name = "TestTask",
                TaskStatus = TaskStatus.InProgress,
                UserId = 1,
                GroupId = 1
            };

            var result = _mapperConfig.CreateMapper().Map<UserTaskDetailsViewModel>(userTaskEntity);

            Assert.IsInstanceOf<UserTaskDetailsViewModel>(result);
            Assert.AreEqual(expected.Name, result.Name);
            Assert.AreEqual(expected.UserId, result.UserId);
            Assert.AreEqual(expected.Id, result.Id);
            Assert.AreEqual(expected.TaskStatus, result.TaskStatus);
            Assert.AreEqual(expected.Deadline, result.Deadline);
        }

        [Test]
        public void Mapper_ShouldCorrectlyMap_UserTaskViewModelToUserTaskEntity()
        {
            var userTaskViewModel = new UserTaskDetailsViewModel
            {
                Id = 1,
                Name = "TestTask",
                TaskStatus = TaskStatus.InProgress,
                UserId = 1,
                Deadline = new DateTime(2003, 2, 1),
                GroupId = 1
            };
            var expected = new UserTaskEntity
            {
                Id = 1,
                Name = "TestTask",
                TaskStatus = 1,
                UserId = 1,
                Deadline = "01.02.2003 00:00:00",
                GroupId = 1
            };

            var result = _mapperConfig.CreateMapper().Map<UserTaskEntity>(userTaskViewModel);

            Assert.IsInstanceOf<UserTaskEntity>(result);
            Assert.AreEqual(expected.Name, result.Name);
            Assert.AreEqual(expected.UserId, result.UserId);
            Assert.AreEqual(expected.Id, result.Id);
            Assert.AreEqual(expected.TaskStatus, result.TaskStatus);
            Assert.AreEqual(expected.Deadline, result.Deadline);
        }

        [Test]
        public void Mapper_ShouldCorrectlyMap_TaskGroupEntityToTaskGroupViewModel()
        {
            var taskGroupEntity = new TaskGroupEntity
            {
                Id = 1,
                Name = "TestTaskGroup",
                UserTasks = new List<UserTaskEntity> { new UserTaskEntity { Id = 1, Name = "TestTask1" }, new UserTaskEntity { Id = 2, Name = "TestTask2" } }
            };
            var expected = new TaskGroupViewModel
            {
                Id = 1,
                Name = "TestTaskGroup",
                UserTasks = new[] { 1, 2 }
            };

            var result = _mapperConfig.CreateMapper().Map<TaskGroupViewModel>(taskGroupEntity);

            Assert.IsInstanceOf<TaskGroupViewModel>(result);
            Assert.AreEqual(expected.Id, result.Id);
            Assert.AreEqual(expected.Name, result.Name);
            CollectionAssert.AreEquivalent(expected.UserTasks, result.UserTasks);
        }

        [Test]
        public void Mapper_ShouldCorrectlyMap_TaskGroupViewModelToTaskGroupEntity()
        {
            var taskGroupViewModel = new TaskGroupViewModel
            {
                Id = 1,
                Name = "TestTaskGroup",
            };
            var expected = new TaskGroupEntity
            {
                Id = 1,
                Name = "TestTaskGroup",
            };

            var result = _mapperConfig.CreateMapper().Map<TaskGroupEntity>(taskGroupViewModel);

            Assert.IsInstanceOf<TaskGroupEntity>(result);
            Assert.AreEqual(expected.Name, result.Name);
        }
    }
}