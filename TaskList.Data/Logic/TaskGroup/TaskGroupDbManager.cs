using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TaskList.Data.Models.DbEntities;
using TaskList.Data.Models.ViewModels;

namespace TaskList.Data.Logic.TaskGroup
{
    class TaskGroupDbManager : ITaskGroupDbManager
    {
        private readonly TasksDbContext _dbContext;
        private readonly IMapper _mapper;

        public TaskGroupDbManager(ITasksDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext as TasksDbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public List<TaskGroupViewModel> Get()
        {
            return _dbContext.TaskGroups
                .Include(g => g.UserTasks)
                .Select(g => _mapper.Map<TaskGroupViewModel>(g))
                .ToList();
        }

        [return: MaybeNull]
        public TaskGroupViewModel Get(int id)
        {
            return !TryFindGroupInDb(id, out var groupFromDb) ? null : _mapper.Map<TaskGroupViewModel>(groupFromDb);
        }

        public TaskGroupEntity Create(TaskGroupViewModel group)
        {
            var newGroup = _mapper.Map<TaskGroupEntity>(group);
            newGroup = _dbContext.TaskGroups.Add(newGroup).Entity;
            
            _dbContext.SaveChanges();
            return newGroup;
        }

        public bool Update(int id, TaskGroupViewModel group)
        {
            if (!TryFindGroupInDb(id, out var groupFromDb)) return false;

            var updatedGroup = _mapper.Map<UserTaskEntity>(group);
            _dbContext.Entry(groupFromDb).CurrentValues.SetValues(updatedGroup);
            return true;
        }

        public bool Remove(int id)
        {
            if (!TryFindGroupInDb(id, out var groupFromDb)) return false;

            _dbContext.TaskGroups.Remove(groupFromDb);
            _dbContext.SaveChanges();
            return true;
        }

        private bool TryFindGroupInDb(int id, out TaskGroupEntity groupFromDb)
        {
            groupFromDb = _dbContext.TaskGroups.Find(id);
            return groupFromDb != null;
        }
    }
}