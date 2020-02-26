﻿using AutoMapper;
using NUnit.Framework;
using TaskList.Data.Models;

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
    }
}