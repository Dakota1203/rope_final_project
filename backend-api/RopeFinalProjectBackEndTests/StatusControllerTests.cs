﻿using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using NSubstitute;
using RopeFinalProjectBackEnd.Models;
using RopeFinalProjectBackEnd.Controllers;
using RopeFinalProjectBackEnd.Repositories;

namespace RopeFinalProjectBackEndTests
{
    public class StatusControllerTests
    {
        StatusController underTest;
        IRepository<Status> statusRepo;

        public StatusControllerTests()
        {
            statusRepo = Substitute.For<IRepository<Status>>();
            underTest = new StatusController(statusRepo);
        }
        [Fact]
        public void Get_By_Id_Returns_Valid_Release_Task()
        {
            var newRelease = new Status();
            statusRepo.GetById(1).Returns(newRelease);
            var result = underTest.Get(1);
            Assert.Equal(newRelease, result);
        }
    }
}
