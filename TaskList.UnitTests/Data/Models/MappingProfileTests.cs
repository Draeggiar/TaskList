using AutoMapper;
using NUnit.Framework;
using System;
using System.Collections.Generic;
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
                UserId = null,
                GroupId = 1
            };
            var expected = new UserTaskViewModel
            {
                Deadline = new DateTime(2003, 2, 1),
                Id = 1,
                Name = "TestTask",
                TaskStatus = 1,
                User = null,
                GroupId = 1
            };

            var result = _mapperConfig.CreateMapper().Map<UserTaskViewModel>(userTaskEntity);

            Assert.That(result, Is.InstanceOf<UserTaskViewModel>());
            Assert.That(result.Id, Is.EqualTo(expected.Id));
            Assert.That(result.Name, Is.EqualTo(expected.Name));
            Assert.That(result.User, Is.EqualTo(expected.User));
            Assert.That(result.TaskStatus, Is.EqualTo(result.TaskStatus));
            Assert.That(result.Deadline, Is.EqualTo(expected.Deadline));
        }

        [Test]
        public void Mapper_ShouldCorrectlyMap_UserTaskViewModelToUserTaskEntity()
        {
            var userTaskViewModel = new UserTaskViewModel
            {
                Id = 1,
                Name = "TestTask",
                TaskStatus = 1,
                User = new UserViewModel
                {
                    Id = 1,
                    FirstName = "Name",
                    LastName = "Surname"
                },
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
                UserTasks = new List<UserTaskViewModel> { new UserTaskViewModel { Id = 1, Name = "TestTask1" }, new UserTaskViewModel { Id = 2, Name = "TestTask2" } }
            };

            var result = _mapperConfig.CreateMapper().Map<TaskGroupViewModel>(taskGroupEntity);

            Assert.IsInstanceOf<TaskGroupViewModel>(result);
            Assert.AreEqual(expected.Id, result.Id);
            Assert.AreEqual(expected.Name, result.Name);
            Assert.That(result.UserTasks, Is.EquivalentTo(expected.UserTasks));
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