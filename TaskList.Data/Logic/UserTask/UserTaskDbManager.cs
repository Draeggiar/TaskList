using AutoMapper;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using TaskList.Data.Models.DbEntities;
using TaskList.Data.Models.ViewModels;

namespace TaskList.Data.Logic.UserTask
{
    public class UserTaskDbManager : IUserTaskDbManager
    {
        private readonly TasksDbContext _dbContext;
        private readonly IMapper _mapper;

        public UserTaskDbManager(TasksDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public List<UserTaskViewModel> Get()
        {
            return _dbContext.UserTasks
                .Select(t => _mapper.Map<UserTaskViewModel>(t))
                .ToList();
        }

        [return: MaybeNull]
        public UserTaskViewModel Get(int id)
        {
            return !TryFindTaskInDb(id, out var taskFromDb) ? null : _mapper.Map<UserTaskViewModel>(taskFromDb);
        }

        public int Create(UserTaskViewModel taskDetailsViewModel)
        {
            var newTask = _mapper.Map<UserTaskEntity>(taskDetailsViewModel);
            newTask = _dbContext.UserTasks.Add(newTask).Entity;

            _dbContext.SaveChanges();

            return newTask.Id;
        }

        public bool Update(int id, UserTaskViewModel taskDetailsViewModel)
        {
            if (!TryFindTaskInDb(id, out var taskFromDb)) return false;

            var updatedTask = _mapper.Map<UserTaskEntity>(taskDetailsViewModel);
            _dbContext.Entry(taskFromDb).CurrentValues.SetValues(updatedTask);
            _dbContext.SaveChanges();
            return true;
        }


        public bool Remove(int id)
        {
            if (!TryFindTaskInDb(id, out var taskFromDb)) return false;

            _dbContext.UserTasks.Remove(taskFromDb);
            _dbContext.SaveChanges();
            return true;
        }

        private bool TryFindTaskInDb(int id, out UserTaskEntity taskFromDb)
        {
            taskFromDb = _dbContext.UserTasks.Find(id);
            return taskFromDb != null;
        }
    }
}