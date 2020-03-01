using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using TaskList.Data;
using TaskList.Data.Logic.TaskGroup;
using TaskList.Data.Models;
using TaskList.Data.Models.DbEntities;
using TaskList.Data.Models.ViewModels;

namespace TaskList.UnitTests.Data.Logic.TaskGroup
{
    [TestFixture]
    public class TaskGroupDbManagerTests
    {
        private IMapper _mapper;

        [OneTimeSetUp]
        public void Init()
        {
            _mapper = new MapperConfiguration(cfg => { cfg.AddProfile(new MappingProfile()); }).CreateMapper();
        }

        [Test]
        public void Get_ShouldReturn_AllGroupsFromDb()
        {
            var options = new DbContextOptionsBuilder<TasksDbContext>()
                .UseInMemoryDatabase(databaseName: "Get_all_groups")
                .Options;

            using (var context = new TasksDbContext(options))
            {
                context.TaskGroups.AddRange(new TaskGroupEntity
                {
                    Name = "TestGroup1",
                    UserTasks = new List<UserTaskEntity> { new UserTaskEntity { Name = "TestTask" } }
                }, new TaskGroupEntity
                {
                    Name = "TestGroup2"
                });
                context.SaveChanges();
            }

            using (var context = new TasksDbContext(options))
            {
                var taskGroupManager = new TaskGroupDbManager(context, _mapper);
                var result = taskGroupManager.Get();

                Assert.That(result.Count, Is.EqualTo(2));
                Assert.That(result.Exists(group => group.Name == "TestGroup1" && group.Id == 1 && group.UserTasks.Count() == 1), Is.True);
                Assert.That(result.Exists(group => group.Name == "TestGroup2" && group.Id == 2 && !group.UserTasks.Any()), Is.True);

                context.Database.EnsureDeleted();
            }
        }

        [Test]
        public void GetById_ShouldReturn_CorrectGroupFromDb()
        {
            var options = new DbContextOptionsBuilder<TasksDbContext>()
                .UseInMemoryDatabase(databaseName: "Get_group_by_id")
                .Options;

            using (var context = new TasksDbContext(options))
            {
                context.TaskGroups.AddRange(new TaskGroupEntity
                {
                    Name = "TestGroup1",
                    UserTasks = new List<UserTaskEntity> { new UserTaskEntity { Name = "TestTask" } }
                }, new TaskGroupEntity
                {
                    Name = "TestGroup2"
                });
                context.SaveChanges();
            }

            using (var context = new TasksDbContext(options))
            {
                var taskGroupManager = new TaskGroupDbManager(context, _mapper);
                var result = taskGroupManager.Get(1);

                Assert.That(result.Id, Is.EqualTo(1));
                Assert.That(result.Name, Is.EqualTo("TestGroup1"));
                Assert.That(result.UserTasks.ToList().Exists(t => t.Name == "TestTask"), Is.True);

                context.Database.EnsureDeleted();
            }
        }

        [Test]
        public void Create_ShouldAdd_CorrectEntityToDb()
        {
            var options = new DbContextOptionsBuilder<TasksDbContext>()
                .UseInMemoryDatabase(databaseName: "Get_create_group")
                .Options;

            using (var context = new TasksDbContext(options))
            {
                var taskGroupManager = new TaskGroupDbManager(context, _mapper);
                taskGroupManager.Create(new TaskGroupViewModel
                {
                    Name = "TestGroup",
                    UserTasks = new List<UserTaskViewModel> { new UserTaskViewModel { Name = "TestTask1" }, new UserTaskViewModel { Name = "TestTask2" } }
                });
            }

            using (var context = new TasksDbContext(options))
            {
                Assert.That(context.TaskGroups.Count(), Is.EqualTo(1));
                Assert.That(context.UserTasks.Count(), Is.EqualTo(2));

                var result = context.TaskGroups.Include(g => g.UserTasks).First();
                Assert.That(result.Name, Is.EqualTo("TestGroup"));
                Assert.That(result.UserTasks.Count, Is.EqualTo(2));
                Assert.That(result.UserTasks.ToList().Exists(t => t.Name == "TestTask1" || t.Name == "TestTask2"), Is.True);
            }
        }

        [Test]
        public void Update_ShouldSet_CorrectValuesOnEntity()
        {
            var options = new DbContextOptionsBuilder<TasksDbContext>()
                .UseInMemoryDatabase(databaseName: "Update_group")
                .Options;

            using (var context = new TasksDbContext(options))
            {
                context.TaskGroups.Add(new TaskGroupEntity
                {
                    Name = "TestGroup1",
                    UserTasks = new List<UserTaskEntity> {new UserTaskEntity {Name = "TestTask"}}
                });
                context.SaveChanges();

                var groupsDbManger = new TaskGroupDbManager(context, _mapper);
                groupsDbManger.Update(1, new TaskGroupViewModel
                {
                    Id = 1,
                    Name = "UpdatedGroup",
                    UserTasks = new List<UserTaskViewModel>
                        {new UserTaskViewModel {Name = "TestTask1"}, new UserTaskViewModel {Name = "TestTask2"}}
                });
            }

            using (var context = new TasksDbContext(options))
            {
                Assert.That(context.TaskGroups.Count(), Is.EqualTo(1));
                Assert.That(context.UserTasks.Count(), Is.EqualTo(2));

                var result = context.TaskGroups.Include(g => g.UserTasks).First();
                Assert.That(result.Id, Is.EqualTo(1));
                Assert.That(result.Name, Is.EqualTo("UpdatedGroup"));
                Assert.That(result.UserTasks.ToList().Exists(t => t.Name == "TestTask1" || t.Name == "TestTask2"), Is.True);
            }
        }
    }
}