using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Linq;
using TaskList.Data;
using TaskList.Data.Models.DbEntities;

namespace TaskList.UnitTests
{
    [TestFixture]
    public class TaskDbContextTests
    {
        [Test]
        public void Create_ShouldAdd_NewUserTaskEntityToDb()
        {
            var options = new DbContextOptionsBuilder<TasksDbContext>()
                .UseInMemoryDatabase(databaseName: "Create_test")
                .Options;
            var expected = new UserTaskEntity
            {
                Name = "TestTask",
                Deadline = "01.02.2003 00:00:00",
                TaskStatus = 0,
                UserId = 1,
            };

            using (var context = new TasksDbContext(options))
            {
                context.UserTasks.Add(new UserTaskEntity
                {
                    Name = "TestTask",
                    Deadline = "01.02.2003 00:00:00",
                    TaskStatus = 0,
                    UserId = 1,
                });
            }

            using (var context = new TasksDbContext(options))
            {
                Assert.That(context.UserTasks.Count(), Is.EqualTo(1));
                var taskFromDb = context.UserTasks.First();
                Assert.That(taskFromDb.Id, Is.Not.EqualTo(0));
                Assert.That(taskFromDb.Name, Is.EqualTo(expected.Name));
                Assert.That(taskFromDb.Deadline, Is.EqualTo(expected.Deadline));
                Assert.That(taskFromDb.TaskStatus, Is.EqualTo(expected.TaskStatus));
                Assert.That(taskFromDb.UserId, Is.EqualTo(expected.UserId));
            }
        }

        [Test]
        public void Create_ShouldAdd_NewTaskGroupEntityToDb()
        {
            var options = new DbContextOptionsBuilder<TasksDbContext>()
                .UseInMemoryDatabase(databaseName: "Create_test")
                .Options;
            var expected = new TaskGroupEntity
            {
                Name = "TestGroup"
            };

            using (var context = new TasksDbContext(options))
            {
                context.TaskGroups.Add(expected);
            }

            using (var context = new TasksDbContext(options))
            {
                Assert.That(context.TaskGroups.Count(), Is.EqualTo(1));
                var groupFromDb = context.TaskGroups.First();
                Assert.That(groupFromDb.Id, Is.Not.EqualTo(0));
                Assert.That(groupFromDb.Name, Is.EqualTo(expected.Name));
            }
        }
    }
}