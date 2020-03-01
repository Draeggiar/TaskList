using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using TaskList.Data.Models.ViewModels;

namespace TaskList.Data.Logic.User
{
    class UserDbManager : IUserDbManager
    {
        private readonly TasksDbContext _dbContext;
        private readonly IMapper _mapper;

        public UserDbManager(TasksDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

            _dbContext.Database.EnsureCreated();
        }

        public List<UserViewModel> Get() => _dbContext.Users.Select(u => _mapper.Map<UserViewModel>(u)).ToList();
    }
}