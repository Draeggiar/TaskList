using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using AutoMapper;
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
                .Select(g => _mapper.Map<TaskGroupViewModel>(g))
                .ToList();
        }

        [return: MaybeNull]
        public TaskGroupViewModel Get(int id)
        {
            var groupFromDb = _dbContext.TaskGroups.Find(id);
            return groupFromDb == null ? null : _mapper.Map<TaskGroupViewModel>(groupFromDb);
        }

        public TaskGroupEntity Create(TaskGroupViewModel group)
        {
            var newGroup = _dbContext.TaskGroups.Add(_mapper.Map<TaskGroupEntity>(group));
            _dbContext.SaveChanges();
            return newGroup.Entity;
        }

        public void Update(int id, TaskGroupViewModel group)
        {
            var updatedGroup = _mapper.Map<TaskGroupEntity>(group);
            updatedGroup.Id = id;
            _dbContext.TaskGroups.Update(updatedGroup);
            _dbContext.SaveChanges();
        }

        public void Remove(int id)
        {
            var groupFromDb = _dbContext.TaskGroups.Find(id);
            _dbContext.TaskGroups.Remove(groupFromDb);
            _dbContext.SaveChanges();
        }
    }
}